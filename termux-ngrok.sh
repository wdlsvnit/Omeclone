set -e
wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok.zip
rm -rf ngrok.zip
./ngrok authtoken 1oWDFci0TDVwcGZkeeLf4sJsmjn_4xgJcnqbj5BgVetRV19uz
./ngrok http 3000



