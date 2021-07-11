const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
console.log('hI');
app.post('/sms', (req, res) => {
    console.log(req.body);
    
    const twiml = new MessagingResponse();
    var EmailResponse = Emailresponse();
    twiml.message(EmailResponse);
    

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
function Emailresponse(){
    return ('hello how are you')
}
http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
  });