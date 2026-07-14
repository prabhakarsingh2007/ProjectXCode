import logging
from django.core.mail import EmailMessage
from django.conf import settings
from utils.background_tasks import run_in_background

logger = logging.getLogger('projectxcode')

def _send_email_task(subject, recipient, body, attachment_data=None, attachment_name=None):
    try:
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient]
        )
        if attachment_data and attachment_name:
            email.attach(attachment_name, attachment_data, 'application/pdf')
        email.send(fail_silently=False)
        logger.info(f"Email notification successfully sent to {recipient} with subject: '{subject}'")
    except Exception as e:
        logger.error(f"Failed to send email notification to {recipient}: {str(e)}")

def send_email_notification(subject, recipient, body, attachment_buffer=None, attachment_name=None):
    # Retrieve raw bytes on the main thread before starting the background process
    attachment_data = attachment_buffer.getvalue() if attachment_buffer else None
    
    # Delegate to the thread pool executor
    run_in_background(_send_email_task, subject, recipient, body, attachment_data, attachment_name)

def _send_whatsapp_task(phone_number, body):
    message_log = f"\n[WHATSAPP_NOTIFICATION] To: {phone_number}\n[MESSAGE]: {body}\n"
    print(message_log)
    logger.info(f"WhatsApp notification simulated for {phone_number}: '{body}'")

def send_whatsapp_notification(phone_number, body):
    run_in_background(_send_whatsapp_task, phone_number, body)
