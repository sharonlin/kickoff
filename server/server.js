var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello Kickoff!');
});

app.listen(3000, function () {
  console.log('EKickoff server listening on port 3000!');
});