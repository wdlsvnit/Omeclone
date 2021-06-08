#!/bin/bash

set -e
root=$PWD

download() {
    set -e
    wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
    unzip ngrok.zip
    rm -rf ngrok.zip
    echo "Download complete" 
}

# start web server
#echo "Starting web server..."

# start tunnel
echo "Starting ngrok tunnel in region ap"
.ngrok authtoken 1oWDFci0TDVwcGZkeeLf4sJsmjn_4xgJcnqbj5BgVetRV19uz
.ngrok tcp -region ap --log=stdout 1025 > | sed '/started tunnel/ q'
orig_server_ip=`curl --silent http://127.0.0.1:4040/api/tunnels | jq '.tunnels[0].public_url'`
trimmed_server_ip=`echo $orig_server_ip | grep -o '[a-zA-Z0-9.]*\.ngrok.io[0-9:]*'`
server_ip="${trimmed_server_ip:-$orig_server_ip}"
echo "Server IP is: $server_ip"
echo "Server running on: $server_ip" >

# Start web
#PATH=$PWD/jre/bin:$PATH
echo "Running server..."
