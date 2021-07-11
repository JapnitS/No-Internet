const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.SID;
const token = process.env.token;
const client = require('twilio')(accountSid,token);

client.messages.create(
    {
        to : '+14168430961',
        from : '+12898152609',
        body :'hello from Japnit Singh',
        mediaUrl : 'https://demo.twilio.com/owl.png'
    }
).then((res) => console.log(res))