const express = require('express');
const { google } = require('googleapis'); 
const opn = require('opn');
const { OAuth2 } = google.auth;
const fs = require('fs');
const {OAuth2Client} = require('google-auth-library'); 


const oAuth2Client = new OAuth2Client('533898342916-dsaqfk65hr7qiclv5e1a0324in9e7cjh.apps.googleusercontent.com',
'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',
'http://localhost:3000/auth/callback');
 
 
const oauth2Client = new OAuth2(
    '533898342916-dsaqfk65hr7qiclv5e1a0324in9e7cjh.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/auth/callback'
  );


  google.options({ auth: oauth2Client });
  
  // Generate a URL to request access to the Google Calendar API
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.events.readonly'
  ];

   
  
 

const login = async (req, res, next ) => { 
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      res.redirect(authUrl);

}

const redirected = async (req, res, next ) => {
    try { 
      
        const { tokens } = await oauth2Client.getToken(req.query.code);
       
        oauth2Client.setCredentials(tokens);
        console.log('Access token:', tokens.access_token);
        // Save the access token to a file or database for later use
        fs.writeFileSync('token.json', JSON.stringify(tokens));
        oAuth2Client.setCredentials(tokens);
        //opn(`http://localhost:4200/home`);
        
        // get user info
        const { data } = await google.oauth2({ version: "v2", auth: oAuth2Client }).userinfo.get();
        console.log("User email:", data.email);
        result = [{
          "token" : tokens.access_token,
          "email" : data.email
        }
        ]
       const newUrl = 'http://localhost:4200/membre';
    res.cookie('access_token', tokens.id_token, { maxAge: 3600000, httpOnly: false });
    res.setHeader('Location', newUrl);
    res.statusCode = 302;
    res.end()
        
      } catch (error) {
        console.error('Error retrieving access token:', error);
        res.send('Authentication failed!');
      }
}
 

 


module.exports = {
   login,redirected
}