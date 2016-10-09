
var Robin = require('robin-js-sdk');
var nodemailer = require("nodemailer");

var express = require('express');
var robin = new Robin('Q6BLnVKPwSGbC5ouwHMPESYERtwlxbgufy9YPHNVF6AAb0QXtrMTBOwKSIueb7LXrju1PM9FPaaRY30M2m9x0uTp3Ec8IWLI8ztKd5Pw9o31HMOVcB5zC9Vtx4XUoPeb');
var app = express();
var array = [];
var subject1 = "Welcome to Robin chat";
var message1 = "Hey there new friend, I see you made it to the ILC and logged in with Robin to connect with others around you.Thank you for your interest in Robin Chat!If you're a bird, sorry you're in the wrong place, you wanted Robins chat. Either way, you should check out the new chat at: https://robin-chat-firebase.firebaseapp.com/ Be safe and stay fly 😊-Robin chat team";



function sendEmail ( _name, _email, _subject, _message) {
    console.log('Sending email to: '+ _name);
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'noreply@robin-chat-firebase.firebaseapp.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
}

robin.api.spaces.presence.get(763).then(function (response) {

  var presenceResponse = response.getData().map(function(presence) {
    // return presence.user.slug
    return presence.user.primary_email.email
  });


   array = presenceResponse;
// 'smtps://robinchat.noreply@gmail.com:Rob1nChatAdm1n@smtp.gmail.com'

  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "robinchat.noreply@gmail.com",
        pass: "Rob1nChatAdm1n"
    }
  });

  // var smtpTransport = nodemailer.createTransport('smtps://robinchat.noreply@gmail.com:Rob1nChatAdm1n@smtp.gmail.com');


  for(var email in array) {
    console.log(array[email]);

     var mailOptions={
        'to' : array[email],
        'subject' : subject1,
        'text' : message1
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, res){
        if(error){
            return console.log(error);
        }
        else {
          console.log("Message sent: " + res.message);
        }
    });
    
  }


});


// app.listen(process.env.PORT || 3412);
