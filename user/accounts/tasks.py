from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_otp_email(email, otp):

    try:
        send_mail(
                subject='OTP Verification',
                message=(
                    f"{otp} is your One-Time Password for account verification on Avax. "
                    "This OTP is valid for 1 minute. Please do not share it with anyone."
                ),
                from_email='info.avax@gmail.com',
                recipient_list=[email],
                fail_silently=False,
            )
        return {'status': 'success', 'email': email}
    except Exception as e:
        print(str(e))
        return {'status': 'error', 'error': str(e)}
