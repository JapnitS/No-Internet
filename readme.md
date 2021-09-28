# Welcome to No-Internet

This project is just in the setup phase
It is capable of recieving messages and sending responses

To do that
Go to server dir and run node server.js 

this will run the server
go to another terminal window and run ./ngrok http 1337
and then update the url on the twilio webpage

You will recieve a text from +12898152609  and respond back as per the info in the text.

Gmail isn't fully integrated yet, but if you scroll down to the bottom of the server.js file, uncomment the first get request, paste it in your browser and you'll see a list of ids and message ids in your console.log

My application is capable of obtaining an access_token and queries the gmail API but lacks on parsing and sending it to the user.

Thanks
Stay tuned for further updates

