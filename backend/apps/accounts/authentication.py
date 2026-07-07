# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # 1. Read token from cookies
        raw_token = request.COOKIES.get('access_token')
        
        # 2. Fallback to HTTP Authorization Header
        if raw_token is None:
            header = self.get_header(request)
            if header is not None:
                raw_token = self.get_raw_token(header)
                
        if raw_token is None:
            return None

        # 3. Validate token
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
