const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.SID;
const token = process.env.token;
const client = require('twilio')(accountSid,token);
const participants = [ '+14168430961'];
const sendSmsToParticipants  = participants => {
for(let i =0; i < participants.length; i ++){
client.messages.create(
   
 {
        to : participants[i],
        from : '+12898152609',
        body :'Hello your No-Internet Buddy welcomes you!! PRESS and SEND 1. Search up on google, 2. Read your new emails, 3.Check weather of your city, 4. Request an Uber Ride,',
        // mediaUrl : 'https://demo.twilio.com/owl.png'
    }
)
}
}
sendSmsToParticipants(participants);
module.exports = {sendSmsToParticipants};
