set -e
wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok.zip
rm -rf ngrok.zip
./ngrok authtoken 1Vnz8cfEaywc5xGAm02QrnSNfvS_5ZEZQuGzWaETeQi3gY4A2
./ngrok http 3000



