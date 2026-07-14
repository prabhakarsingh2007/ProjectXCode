# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import CSRFCheck  # pyrefly: ignore [missing-import]
from rest_framework.exceptions import PermissionDenied  # pyrefly: ignore [missing-import]

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # 1. Read token from cookies
        raw_token = request.COOKIES.get('access_token')
        from_cookie = True
        
        # 2. Fallback to HTTP Authorization Header
        if raw_token is None:
            from_cookie = False
            header = self.get_header(request)
            if header is not None:
                raw_token = self.get_raw_token(header)
                
        if raw_token is None:
            return None

        # 3. If token came from cookie, enforce CSRF validation
        if from_cookie:
            self.enforce_csrf(request)

        # 4. Validate token
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token

    def enforce_csrf(self, request):
        # Safe HTTP methods do not require CSRF protection
        if request.method in ('GET', 'HEAD', 'OPTIONS', 'TRACE'):
            return
            
        check = CSRFCheck(request)
        # Populates request.META['CSRF_COOKIE']
        check.put_cookie_last()
        reason = check.process_view(request, None, (), {})
        if reason:
            raise PermissionDenied(f'CSRF Failed: {reason}')
