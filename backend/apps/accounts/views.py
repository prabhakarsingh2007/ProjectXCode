import logging
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger('projectxcode')
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from utils.background_tasks import run_in_background
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

# Helper function to inject JWT tokens into response cookies
def set_jwt_cookies(response, user):
    refresh = RefreshToken.for_user(user)
    
    # Set Access Token Cookie (1 Day Max-Age)
    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=not settings.DEBUG,  # True in production (HTTPS only)
        samesite='Lax',
        max_age=3600*24
    )
    
    # Set Refresh Token Cookie (7 Days Max-Age)
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=not settings.DEBUG,
        samesite='Lax',
        max_age=3600*24*7
    )

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        response = Response({
            'user': UserSerializer(user).data,
            'detail': 'Registration successful. Tokens set in cookies.'
        }, status=status.HTTP_201_CREATED)
        
        set_jwt_cookies(response, user)
        return response

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user is not None:
            logger.info(f"Authentication successful for user: {username}")
            response = Response({
                'user': UserSerializer(user).data,
                'detail': 'Login successful. Tokens set in cookies.'
            }, status=status.HTTP_200_OK)
            set_jwt_cookies(response, user)
            return response
        logger.warning(f"Failed login attempt for username: {username}")
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        response = Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        # Clear JWT cookies
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class TokenRefreshCookieView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'detail': 'Refresh token not found.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = TokenRefreshSerializer(data={'refresh': refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        access_token = serializer.validated_data.get('access')
        refresh_token_rotated = serializer.validated_data.get('refresh')

        response = Response({'detail': 'Token refreshed.'}, status=status.HTTP_200_OK)
        
        # Set access token cookie
        response.set_cookie(
            key='access_token',
            value=str(access_token),
            httponly=True,
            secure=not settings.DEBUG,
            samesite='Lax',
            max_age=3600*24
        )
        
        # If refresh token rotated, update refresh cookie
        if refresh_token_rotated:
            response.set_cookie(
                key='refresh_token',
                value=str(refresh_token_rotated),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=3600*24*7
            )
            
        return response

class ProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Password Reset APIs
class PasswordResetRequestView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(email=email).first()
        if user:
            logger.info(f"Password reset requested for active email: {email}")
            # Generate secure token and UID
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Format React frontend password reset confirm URL
            reset_url = f"http://localhost:5173/reset-password?uid={uid}&token={token}"
            
            subject = "Password Reset Request - ProjectXCode"
            message = (
                f"Hello {user.first_name or user.username},\n\n"
                f"We received a request to reset your password. Use the link below to set a new password:\n\n"
                f"{reset_url}\n\n"
                f"If you did not request this, please ignore this email.\n\n"
                f"Sincerely,\n"
                f"ProjectXCode Team"
            )
            
            # Send email asynchronously (using console email backend in dev)
            run_in_background(
                send_mail,
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False
            )
            
        # Security: returns same status response to prevent email discovery attacks
        return Response(
            {'detail': 'If the email matches an active account, a password reset link has been dispatched.'},
            status=status.HTTP_200_OK
        )

class PasswordResetConfirmView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        if not all([uidb64, token, new_password]):
            return Response({'detail': 'Missing parameters: uid, token, and new_password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
            
        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            logger.info(f"Password successfully reset for user: {user.username}")
            return Response({'detail': 'Your password has been reset successfully.'}, status=status.HTTP_200_OK)
            
        logger.warning("Invalid or expired password reset token confirmation attempt")
        return Response({'detail': 'The reset token is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Only admins or staff members can manage users list
        user = self.request.user
        if user and (user.is_staff or user.role == 'admin'):
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

