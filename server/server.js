var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const http = require('http');

const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const { sendSmsToParticipants } = require('./send-sms');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/sms', (req, res) => {
  var Body = req.body.Body;
  const twiml = new MessagingResponse();

  if (Body.startsWith('1')) {
    query = Body.substring(1, Body.length);

    twiml.message(googleRequest(query));
  } else if (Body.startsWith('3')) {
    query = Body.substring(1, Body.length);

    let res = '';
    res = checkWeather(query);
    res = JSON.parse(res);

    let min_temp = parseInt(res['main']['temp_min']) / 10;
    let max_temp = parseInt(res['main']['temp_max']) / 10;
    twiml.message(
      'The weather in' +
        query +
        ' is ' +
        res['weather'][0]['description'] +
        ' with a min temp of ' +
        min_temp +
        ' degrees celcius and a max temp of ' +
        max_temp +
        ' degrees celcius',
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });

  res.end(twiml.toString());
});

const googleRequest = (query) => {
  var xmlHttp = new XMLHttpRequest();
  //google request query
  xmlHttp.open('GET', 'https://www.google.com/search?q=' + query);
  xmlHttp.send(null);
  return xmlHttp.responseText;
};
http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

const checkWeather = (city) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=0c4cafc732d5cca1dafebe44159f496d',
    false,
  ); // false for synchronous request

  xmlHttp.send(null);

  return xmlHttp.responseText;
};
