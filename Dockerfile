FROM ubuntu:19.04

RUN apt-get update
RUN apt-get install -y git wget nano libnode64

RUN wget http://archive.ubuntu.com/ubuntu/pool/universe/n/nodejs/nodejs_10.15.2~dfsg-1_amd64.deb
RUN dpkg -i nodejs_10.15.2~dfsg-1_amd64.deb && apt-get install -y npm

ENV MEGA_BACKEND_HOST = "backend_host"

RUN git clone https://github.com/jasonjimnz/megafront.git
RUN npm install -g serve
RUN npm install --prefix /megafront/
RUN npm run build BACKEND_HOST=${MEGA_BACKEND_HOST} --prefix /megafront/

EXPOSE 5000

RUN ["./megafront/start_front_server.sh"]