const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.SID;
const token = process.env.token;
const client = require('twilio')(accountSid, token);
const participants = ['+14168430961'];
const sendSmsToParticipants = () => {
  for (let i = 0; i < participants.length; i++) {
    client.messages.create({
      to: participants[i],
      from: '+12898152609',
      body: 'Hello your No-Internet Buddy welcomes you!!                      SEND 1. Search a word up on google followed by the word, 2. Read your new emails, 3.Check weather of your city, 4. Get the GO train timings,',
      // mediaUrl : 'https://demo.twilio.com/owl.png'
    });
  }
};
sendSmsToParticipants();

module.exports = sendSmsToParticipants;
