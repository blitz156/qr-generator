from project.settings import * # noqa

DEBUG = True

ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "http://localhost:3000",
]

QR_DOMAIN = "http://localhost:8000"