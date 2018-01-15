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

app.listen(8000);
console.log(`Server is runnning at ${port}`);
