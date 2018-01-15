"use strict";

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

app.listen(port);
console.log(`Server is runnning at ${port}`);
