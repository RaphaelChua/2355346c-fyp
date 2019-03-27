#!/bin/bash

read -p 'Please enter the ip address: ' ip_addr
read -p 'Please enter the genesis ip address: ' ip_addr_genesis
echo $ip_addr
echo $ip_addr_genesis
echo Generating environment files with ip address = $ip_addr and genesis address = $ip_addr_genesis
cp .env.sample ./.env
sed -i "s|<ipaddr>|$ip_addr|g" ./.env
sed -i "s|<ipaddrgenesis>|$ip_addr_genesis|g" ./.env
sed -i "s|<ipaddrnode>|0|g" ./.env

echo Config files generated!