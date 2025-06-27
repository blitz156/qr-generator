FROM node:24 AS frontend-build

COPY ./frontend/src/ /src/
WORKDIR /src
RUN npm install
RUN npm run build


# ====================================================================== #
FROM python:3.13-slim as backend-build

RUN mkdir /src/
ADD ./backend/ /src/
WORKDIR /src
RUN pip install -r /src/requirements/requirements.txt
RUN python manage.py collectstatic


# ====================================================================== #
FROM nginx:1.29

ADD ./nginx/etc/nginx/ /etc/nginx/
COPY --from=frontend-build /src/build /var/www/qr-frontend
COPY --from=backend-build /src/staticfiles /var/www/qr-backend
