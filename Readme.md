# Final Year Project
##### Edge Computing with Blockchain for Secure Logistics Application


Name: Raphael Chua Liang Hui
GUID: 2355346C

#### Environment

Ubuntu 16.04

#### Installation

Docker - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04

Docker-Compose - https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04


#### Steps to run the project.

Set the IP address environment by using this command 
```sh
$ sh gen_genesis_config.sh
```

Build the Sawtooth dockerfiles
```sh
$ docker-compose -f sawtooth-seth-node-multiple.yaml build
```


Run the Sawtooth docker container

```sh
$  docker-compose -f sawtooth-seth-node-multiple.yaml up
```

To stop the blockchain application

```sh
$ sh dockerstop.sh
```

Frontend: http://localhost:8080
Grafana: http://localhost:3000




