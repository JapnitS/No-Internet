var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require('http');
// const fetch = require('node-fetch')
// global.fetch = fetch;
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const { sendSmsToParticipants } = require('./send-sms')
const axios = require('axios')

require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/sms', (req, res) => {
    //console.log(req.body);
    var Body = req.body.Body
    const twiml = new MessagingResponse();
  
    if (Body.startsWith('1')){
      
        
        query = Body.substring(1,Body.length)
        //twiml.message(googleRequest(query))
        twiml.message(googleRequest(query))
    }
    else if (Body.startsWith('3')){

      query = Body.substring(1,Body.length)
      let a = checkWeather(query)
      
      
      twiml.message(checkWeather(query))

      

    }

    
   
    // const weatherdetails = checkWeather(req.body.Body)
    // console.log(weatherdetails.main)
   
    // twiml.message(weatherdetails['main'])
   

  res.writeHead(200, {'Content-Type': 'text/xml'});
  
  
  res.end(twiml.toString());
});

const googleRequest = query => {
  var xmlHttp = new XMLHttpRequest();
 //google request query
  xmlHttp.open( "GET", 'https://www.google.com/search?q='+query) 
  xmlHttp.send( null );
  return xmlHttp.responseText;


}
http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
  });



const checkWeather = city => {
  // fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=0c4cafc732d5cca1dafebe44159f496d')
  // .then(data => {
  //   return data.json();
  //   })
var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=0c4cafc732d5cca1dafebe44159f496d', false ); // false for synchronous request
    
    //res = xmlHttp.responseText
    //console.log(JSON.parse(res)["Data"],"loool")
    // xmlHttp.send( null );
    // console.log(res)
    return xmlHttp.responseText;
    // return xmlHttp.responseText;

}

