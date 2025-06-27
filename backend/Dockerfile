FROM python:3.13-slim

RUN mkdir /src/
ADD . /src/

RUN pip install -r /src/requirements/requirements-tests.txt
RUN pip install -r /src/requirements/requirements.txt

WORKDIR /src/
