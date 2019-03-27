#!/bin/bash

# Install gnu-sed first
# brew install gnu-sed

read -p 'Please enter the ip address: ' ip_addr
echo $ip_addr
echo Generating environment files with ip address = $ip_addr
cp .env.sample .env
gsed -i "s|<ipaddr>|$ip_addr|g" ./.env
gsed -i "s|<ipaddrgenesis>|0|g" ./.env
gsed -i "s|<ipaddrnode>|0|g" ./.env

echo Config files generated!