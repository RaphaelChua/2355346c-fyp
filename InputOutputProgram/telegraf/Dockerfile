FROM telegraf:latest

RUN  apt-get update \
  && apt-get install -y sysstat \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /source

COPY /telegraf.conf /etc/telegraf/telegraf.conf

COPY /plugins/iostat/iostat.sh /source

RUN chmod u+x /source/iostat.sh

# ENTRYPOINT ["./iostat.sh"]