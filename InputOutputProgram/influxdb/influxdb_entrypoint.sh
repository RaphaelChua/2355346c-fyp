#!/usr/bin/env sh

if [ ! -f "/var/lib/influxdb/.init" ]; then  
  exec influxd $@ &

  until wget -q "http://0.0.0.0:8086/ping" 2> /dev/null; do
    sleep 1
  done

  curl -i -XPOST "http://0.0.0.0:8086/query" --data-urlencode "q=CREATE DATABASE metrics"

  touch "/var/lib/influxdb/.init"

  kill -s TERM %1
fi

exec influxd $@