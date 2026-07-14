import mimetypes
from django.core.exceptions import ValidationError

ALLOWED_MIME_TYPES = {
    'pdf': ['application/pdf'],
    'zip': ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'],
    'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'png': ['image/png'],
    'jpg': ['image/jpeg', 'image/pjpeg'],
    'jpeg': ['image/jpeg', 'image/pjpeg'],
    'txt': ['text/plain'],
}

FILE_SIGNATURES = {
    'png': b'\x89PNG\r\n\x1a\n',
    'jpg': b'\xff\xd8\xff',
    'jpeg': b'\xff\xd8\xff',
    'pdf': b'%PDF-',
    'zip': b'PK\x03\x04',
    'docx': b'PK\x03\x04',
}

def validate_file_security(file):
    # 1. Validate file extension
    name = file.name.lower()
    ext = name.split('.')[-1] if '.' in name else ''
    
    if ext not in ALLOWED_MIME_TYPES:
        raise ValidationError(f"File extension '.{ext}' is not supported.")
        
    # 2. Validate browser content-type header
    content_type = getattr(file, 'content_type', None)
    if content_type and content_type not in ALLOWED_MIME_TYPES[ext]:
        raise ValidationError(f"File MIME type '{content_type}' does not match extension '.{ext}'.")
        
    # 3. Validate binary magic bytes signature
    if ext in FILE_SIGNATURES:
        try:
            file.seek(0)
            header = file.read(8)
            file.seek(0) # reset stream position
            
            sig = FILE_SIGNATURES[ext]
            if not header.startswith(sig):
                raise ValidationError(f"File signature mismatch. This file does not appear to be a valid .{ext} file.")
        except Exception as e:
            raise ValidationError(f"Failed file integrity audit: {str(e)}")
