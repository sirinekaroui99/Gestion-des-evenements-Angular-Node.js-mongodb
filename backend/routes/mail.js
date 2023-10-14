
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");


router.post("/sendmail",(req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`the mail has been send${info.messageId}`);
      res.send(info);
    })
    
  })
  
  
  
  async function sendMail(user , callback){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port : 587,
      secure :true,
      auth: {
        user: "karouisirine6@gmail.com",
      pass: " " 
    },
    tls: {
        rejectUnauthorized: false
    }
    });
  
    
  let mailOptions = {
    from : 'karouisirine6@gmail.com',
    to : 'karouisirine6@gmail.com',
    subject : "Demande d'échantillon",
    html : user.msg+" a passé une demande d'échantillon"
  };
  
  //send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  callback(info);
  }
  
  router.post("/sendValidmail",(req, res) => {
    console.log("valid request came");
    let user = req.body;
    sendValidMail(user, information => {
      console.log(`the mail has been send${information.messageId}`);
      res.send(information);
    })
    
  })
  
  
  
  async function sendValidMail(user , callback){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port : 465,
      secure :true,
      auth: {
        user: "karouisirine6@gmail.com",
      pass: " " 
    }
    });
  
    
  let validmailOptions = {
    from : 'karouisirine6@gmail.com',
    to : user.email,
    subject : "Demande Validée",
    html : user.name+" Votre demande d'échantillon a été valider par le Pharmacien Responsable Technique "
  };
  
  //send mail with defined transport object
  let information = await transporter.sendMail(validmailOptions);
  callback(information);
  }
  
  
router.post("/sendRefusMail",(req, res) => {
    console.log("valid request came");
    let user = req.body;
    sendRefusMail(user, inform => {
      console.log(`the mail has been send${inform.messageId}`);
      res.send(inform);
    })
    
  })
  
  
  
  async function sendRefusMail(user , callback){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port : 465,
      secure :true,
      auth: {
        user: "karouisirine6@gmail.com",
      pass: " " 
    }
    });
  
    
  let RefusmailOptions = {
    from : 'karouisirine6@gmail.com',
    to : user.email,
    subject : "Demande Refusée",
    html : user.name+" Votre demande d'échantillon a été Refusée par le Pharmacien Responsable Technique "
  };
  
  //send mail with defined transport object
  let inform = await transporter.sendMail(RefusmailOptions);
  callback(inform);
  }
  
  


module.exports = router;
