#!/bin/bash

# environment variables
require_env "ngrok_token" "your ngrok authtoken from https://dashboard.ngrok.com"
require_env "ngrok_region" "your region, one of:
us - United States (Ohio)
eu - Europe (Frankfurt)
ap - Asia/Pacific (Singapore)
au - Australia (Sydney)
sa - South America (Sao Paulo)
jp - Japan (Tokyo)
in - India (Mumbai)" 

# start web server
#echo "Starting web server..."
echo "Minecraft server starting, please wait" > $root/ip.txt

# start tunnel
mkdir -p ./logs
touch ./logs/temp # avoid "no such file or directory"
rm ./logs/*
echo "Starting ngrok tunnel in region ap"
./ngrok authtoken 1oWDFci0TDVwcGZkeeLf4sJsmjn_4xgJcnqbj5BgVetRV19uz
touch logs/ngrok.log
./ngrok tcp -region ap --log=stdout 1025 > ./logs/ngrok.log &
# wait for started tunnel message, and print each line of file as it is written
tail -f ./logs/ngrok.log | sed '/started tunnel/ q'
orig_server_ip=`curl --silent http://127.0.0.1:4040/api/tunnels | jq '.tunnels[0].public_url'`
trimmed_server_ip=`echo $orig_server_ip | grep -o '[a-zA-Z0-9.]*\.ngrok.io[0-9:]*'`
server_ip="${trimmed_server_ip:-$orig_server_ip}"
echo "Server IP is: $server_ip"
echo "Server running on: $server_ip" > $root/ip.txt

touch logs/latest.log
# Experiment: Run http server after all ports are opened
#( tail -f ./logs/latest.log | sed '/RCON running on/ q' && python3 -m http.server 8080 ) &

# Start web
#PATH=$PWD/jre/bin:$PATH
echo "Running server..."
.node index
echo "Exit code $?"
