#!/usr/bin/env sh

url="http://admin:admin@$IP_ADDRESS:3000"

# url="http://admin:admin@127.0.0.1:3000"

post() {
    curl -s -X POST -d "$1" \
        -H 'Content-Type: application/json;charset=UTF-8' \
        "$url$2" 2> /dev/null
}

if [ ! -f "/var/lib/grafana/.init" ]; then
    exec /run.sh $@ &

    until curl -s "$url/api/datasources" 2> /dev/null; do
        sleep 1
    done

    for datasource in /etc/grafana/datasources/*; do
        post "$(cat $datasource)" "/api/datasources"
    done

    for dashboard in /etc/grafana/dashboards/*; do
        post "$(cat $dashboard)" "/api/dashboards/import"
    done

    touch "/var/lib/grafana/.init"

    kill $(pgrep grafana)
fi

exec /run.sh $@