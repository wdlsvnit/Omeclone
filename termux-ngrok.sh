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

# ngrok binary
require_executable "ngrok"

# environment variables
require_env "ngrok_token" "1oWDFci0TDVwcGZkeeLf4sJsmjn_4xgJcnqbj5BgVetRV19uz"
require_env "ngrok_region" "ap"
us - United States (Ohio)
eu - Europe (Frankfurt)
ap - Asia/Pacific (Singapore)
au - Australia (Sydney)
sa - South America (Sao Paulo)
jp - Japan (Tokyo)
in - India (Mumbai)" 

# start web server
#echo "Starting web server..."

# start tunnel
echo "Starting ngrok tunnel in region $ngrok_region"
./ngrok authtoken $ngrok_token
./ngrok tcp -region $ngrok_region --log=stdout 1025 > | sed '/started tunnel/ q'
orig_server_ip=`curl --silent http://127.0.0.1:4040/api/tunnels | jq '.tunnels[0].public_url'`
trimmed_server_ip=`echo $orig_server_ip | grep -o '[a-zA-Z0-9.]*\.ngrok.io[0-9:]*'`
server_ip="${trimmed_server_ip:-$orig_server_ip}"
echo "Server IP is: $server_ip"
echo "Server running on: $server_ip" >

# Start web
#PATH=$PWD/jre/bin:$PATH
echo "Running server..."
.node index

