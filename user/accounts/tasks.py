from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_email(email, subject, message):

    try:
        send_mail(
                subject=subject,
                message=(
                    message
                ),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
        return {'status': 'success', 'email': email}
    except Exception as e:
        return {'status': 'error', 'error': str(e)}
