var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const sendSmsToParticipants = require('./send-sms');
const goData = require('./go-data');
const getDict = require('./check-dict');
const getWeather = require('./check-weather')
var request = require('request');

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
  
  else if (Body.startsWith('1')) {
    let query = Body.substring(1, Body.length);
    twiml.message(getDict(query));
  } 
  
  else if (Body.startsWith('3')) {
    query = Body.substring(1, Body.length);
    twiml.message(getWeather(query));
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });

  res.end(twiml.toString());
});

app.get('*', (req, res) => {
  console.log(req.query.code);
  getToken(req.query.code);
  // console.log(
  //   req.protocol + '://' + req.get('host') + req.originalUrl,
  // );
});

getToken = (code) => {
  //   POST /token HTTP/1.1
  // Host: oauth2.googleapis.com
  // Content-Type: application/x-www-form-urlencoded

  // code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
  // client_id=your_client_id&
  // client_secret=your_client_secret&
  // redirect_uri=https%3A//oauth2.example.com/code&
  // grant_type=authorization_code

  var postData =
    'code=' +
    code +
    '&client_id=' +
    process.env.CLIENT_ID +
    '&client_secret=' +
    process.env.CLIENT_SECRET +
    '&redirect_uri=' +
    'http://localhost:1337' +
    '&grant_type=authorization_code';
  var url = 'https://oauth2.googleapis.com/token';
  var postReq = {
    uri: url,
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  request(postReq, function (error, response) {
    res = JSON.parse(response.body);
    access_token = res['access_token'];
  });
  getMails(access_token);
};

const getMails = (access_token) => {
  const twiml = new MessagingResponse();
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    'GET',
    'https://www.googleapis.com/gmail/v1/users/khuranajapnit@gmail.com/messages',
    false,
  );
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + access_token);

  // let messages = xmlHttp.responseText;
  // messages = JSON.parse(messages);
  // messages = messages['messages'];
  // messages.forEach((message) => {
  //   let id = message.id;
  //   xmlHttp.open(
  //     'GET',
  //     'https://www.googleapis.com/gmail/v1/users/khuranajapnit@gmail.com/messages/{{id}}',
  //     false,
  //   );
  //   xmlHttp.setRequestHeader(
  //     'Authorization',
  //     'Bearer ' + access_token,
  //   );
  //   xmlHttp.send(null);
  //   console.log('EACHHHHH');
  //   console.log(xmlHttp.responseText);
  // });

  xmlHttp.send(null);
  console.log('>>>>>>>>>>>');
  console.log(xmlHttp.responseText);
  return xmlHttp.responseText;
};




// const checkWeather = (city) => {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open(
//     'GET',
//     'https://api.openweathermap.org/data/2.5/weather?q=' +
//       city +
//       '&appid=0c4cafc732d5cca1dafebe44159f496d',
//     false,
//   ); // false for synchronous request

//   xmlHttp.send(null);

//   return xmlHttp.responseText;
// };

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

// 409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com
// 2MZNzHd6B6-57pHSfIusoiJf

// https://accounts.google.com/o/oauth2/v2/auth?
//  scope=https://www.googleapis.com/auth/gmail.readonly&
//  access_type=offline&
//  include_granted_scopes=true&
//  response_type=code&
//  state=state_parameter_passthrough_value&
//  redirect_uri=http://localhost:1337&
//  client_id=409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com

// https://accounts.google.com/o/oauth2/v2/auth?
//  scope=https://www.googleapis.com/auth/gmail.readonly&
//  access_type=offline&
//  include_granted_scopes=true&
//  response_type=code&
//  state=state_parameter_passthrough_value&
//  redirect_uri=https://7541-142-126-234-11.ngrok.io&
//  client_id=409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com

//  http://localhost/?sta
//  te=state_parameter_passthrough_value&code=4%2F0AX4XfWh_xwnyuh1YnpCLx2DSkkflF5Ujc98j8pm8ydPKUj1GLDZO6HFgemu45CzR7dutbA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=consent#

//  curl \
// --request POST \
// --data "code=4%2F0AX4XfWh_xwnyuh1YnpCLx2DSkkflF5Ujc98j8pm8ydPKUj1GLDZO6HFgemu45CzR7dutb&client_id=409688306034-agv1jid3vjmugpjvj6sj7t7t1g5aahm5.apps.googleusercontent.com&client_secret=2MZNzHd6B6-57pHSfIusoiJf&redirect_uri=https://localhost&grant_type=authorization_code" \ https://accounts.google.com/o/oauth2/token
