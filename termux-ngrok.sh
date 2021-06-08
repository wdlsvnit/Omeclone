set -e
wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok.zip
rm -rf ngrok.zip
./ngrok authtoken 1tfIdZg85xyaH9rMh8LAUpbls5k_3wGUNxnyrZRMAPJ37gPnC
./ngrok http 3000



