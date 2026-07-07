import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger('projectxcode')

def send_email_notification(subject, recipient, body):
    try:
        send_mail(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [recipient],
            fail_silently=False
        )
        logger.info(f"Email notification successfully sent to {recipient} with subject: '{subject}'")
    except Exception as e:
        logger.error(f"Failed to send email notification to {recipient}: {str(e)}")

def send_whatsapp_notification(phone_number, body):
    # Simulated WhatsApp notification dispatcher
    # In production, this can hook into Twilio API:
    # client.messages.create(body=body, from_='whatsapp:+...', to=f'whatsapp:{phone_number}')
    message_log = f"\n[WHATSAPP_NOTIFICATION] To: {phone_number}\n[MESSAGE]: {body}\n"
    
    # 1. Print to console for immediate visibility
    print(message_log)
    
    # 2. Write to django.log audit log
    logger.info(f"WhatsApp notification simulated for {phone_number}: '{body}'")
