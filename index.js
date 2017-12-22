const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send("Kickoff to the project");
});

app.listen(8000);
console.log(`Server is runnning at ${port}`);
