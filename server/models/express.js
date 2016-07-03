var express = require('express');
var app = express();

// setup static directory
app.use(express.static('app'));

module.exports = app;