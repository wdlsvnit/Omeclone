wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok.zip
rm -rf ngrok.zip
./ngrok authtoken 1tf5A0O0WRoF3XHGwnSdrazDWfa_hUSqFBb6GMJo1gpLEWrx
node index.js
./ngrok http 3000
netlify deploy





