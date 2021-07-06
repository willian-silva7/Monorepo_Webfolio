# Usar docker build
# getting mongodb base image
# Building Image: docker build -t mymongo .

FROM ubuntu
MAINTAINER will.oliver1994@hotmail.com

RUN apt-get update && apt-get install -y gnupg2
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb-org

EXPOSE 27017

CMD ["mongod"]

# Building Image: docker build -t linuxize/redis .
FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install -y redis-server && \
    apt-get clean

EXPOSE 6379

CMD ["redis-server"]
