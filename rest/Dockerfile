# get our ML focused image
FROM lukedeo/ml-base:0.1
MAINTAINER Luke de Oliveira <lukedeo@ldo.io>

# install python deps
# COPY ./requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# initialize structure
# RUN mkdir -p /src/local
COPY . /src
RUN pip install --no-cache-dir Flask-RESTful

# mount it
WORKDIR /src
RUN mkdir /data
VOLUME /data

# set up env for the api to run
ENV HTTP_PORT 5000

# Expose
EXPOSE 5000

# Run
CMD ["python", "/src/application.py"]
