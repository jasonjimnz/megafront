FROM ubuntu:19.04

RUN apt-get update
RUN apt-get install -y git wget nano libnode64

RUN wget http://archive.ubuntu.com/ubuntu/pool/universe/n/nodejs/nodejs_10.15.2~dfsg-1_amd64.deb
RUN dpkg -i nodejs_10.15.2~dfsg-1_amd64.deb && apt-get install -y npm

# Change the URL for your Megabackend service
ENV MEGA_BACKEND_HOST = "http://192.168.1.11:8000"

RUN git clone https://github.com/jasonjimnz/megafront.git
# Same as above, it should work using env vars, but in Docker seems to work different as Bash
RUN echo "BACKEND_HOST=http://192.168.1.11:8000" >> /megafront/.env
RUN npm install -g serve
RUN npm install --prefix /megafront/
RUN npm run build --BACKEND_HOST=${MEGA_BACKEND_HOST} --prefix /megafront/

EXPOSE 5000

CMD ["/megafront/start_front_server.sh"]