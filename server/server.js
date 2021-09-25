var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const sendSmsToParticipants = require('./send-sms');
const goData = require('./go-data');



const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/sms', async (req, res) => {
  var Body = req.body.Body;
  const twiml = new MessagingResponse();

  if (Body.startsWith('4')) {
    let goTrainData = await goData();
    twiml.message(goTrainData);
   
  }
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

    
    
    //twiml.message(transitData());
  }

  // let b = gmailRequest();
  // console.log(b);

  res.writeHead(200, { 'Content-Type': 'text/xml' });

  res.end(twiml.toString());
});

const getBusData = () => {};

// const googleRequest = (query) => {
//   var xmlHttp = new XMLHttpRequest();
//   //google request query
//   xmlHttp.open('GET', 'https://www.google.com/search?q=' + query);
//   xmlHttp.send(null);
//   return xmlHttp.responseText;
// };
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

const gmailRequest = () => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    'https://www.googleapis.com/gmail/v1/users/khuranajapnit@gmail.com/messages',
    false,
  );
  xmlHttp.send(null);
  return xmlHttp.responseText;
};

// 409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com
// 2MZNzHd6B6-57pHSfIusoiJf

// https://accounts.google.com/o/oauth2/v2/auth?
//  scope=https://www.googleapis.com/auth/gmail.readonly&
//  access_type=offline&
//  include_granted_scopes=true&
//  response_type=code&
//  state=state_parameter_passthrough_value&
//  redirect_uri=http://localhost&
//  client_id=409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com

//  http://localhost/?sta
//  te=state_parameter_passthrough_value&code=4%2F0AX4XfWh_xwnyuh1YnpCLx2DSkkflF5Ujc98j8pm8ydPKUj1GLDZO6HFgemu45CzR7dutbA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=consent#

//  curl \
// --request POST \
// --data "code=4%2F0AX4XfWh_xwnyuh1YnpCLx2DSkkflF5Ujc98j8pm8ydPKUj1GLDZO6HFgemu45CzR7dutb&client_id=409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com&client_secret=2MZNzHd6B6-57pHSfIusoiJf&redirect_uri=https://localhost&grant_type=authorization_code" \ https://accounts.google.com/o/oauth2/token
