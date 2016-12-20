var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next){
  res.render('about', { title: 'About'});
});

router.get('/work', function(req, res, next){
  res.render('work', { title: 'Work'});
});

router.get('/contact', function(req, res, next){
  res.render('contact', { title: 'Contact'});
});

router.get('/submit-contact/:name/:email/:msg', function(req, res, next){
  var transporter = nodemailer.createTransport('smtps://willynogs%40gmail.com:spencer513@smtp.gmail.com');
  var mailOptions = {
    from: `"${req.params.name}" <${req.params.email}>`,
    to: 'willynogs@gmail.com',
    subject: '🔥 new msg 🔥',
    text: `From: ${req.params.name} <${req.params.email}> \n Message: ${req.params.msg}`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.send(req.data);
});

module.exports = router;
