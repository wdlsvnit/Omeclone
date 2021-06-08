wget -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok.zip
rm -rf ngrok.zip
./ngrok authtoken 1tfKMp49YWCfLepG0snLDEYPkFB_679YEVW6kZAD5Ncyi5tus
node index.js
./ngrok http 3000
netlify deploy





