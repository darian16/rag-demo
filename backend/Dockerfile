FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt update
RUN apt upgrade -y
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt update

RUN apt install python3.11 -y
RUN rm /usr/bin/python3
RUN ln -s /usr/bin/python3.11 /usr/bin/python3
RUN python3 --version

RUN apt install python3-pip -y
RUN apt install python3.11-distutils -y
RUN apt install python3.11-dev -y
RUN apt install wget -y
RUN wget https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py
RUN python3 -m pip install --upgrade pip

RUN mkdir /srv/www
RUN mkdir /srv/www/app
COPY . /srv/www/app
RUN python3 -m pip install -r /srv/www/app/requirements.txt
RUN python3 /srv/www/app/init_embebber.py
EXPOSE 8080

COPY entrypoint.sh /srv/www/app/entrypoint.sh
RUN sed -i 's/\r$//' /srv/www/app/entrypoint.sh
RUN chmod +x /srv/www/app/entrypoint.sh
ENTRYPOINT ["bash", "/srv/www/app/entrypoint.sh"]
