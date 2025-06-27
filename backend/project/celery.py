import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

app = Celery('project')
app.config_from_object('django.conf:settings', namespace='CELERY')

# Import celerybeat schedule
from .celerybeat_schedule import CELERYBEAT_SCHEDULE

# Configure celerybeat schedule
app.conf.beat_schedule = CELERYBEAT_SCHEDULE

app.autodiscover_tasks()