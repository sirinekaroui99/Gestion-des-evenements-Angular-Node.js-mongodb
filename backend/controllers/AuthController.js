const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

const register = (req, res, next) => {
    console.log('req',req.body)
    bcrypt.hash(req.body.password, 10, function(err,hashedPass){
        if(err) {
            res.json({
                error : err
            })
        } 
        let user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPass,
        role : req.body.role,

    }) 

    user.save()
    .then(user => {
        res.json({
            message : "user added successfully"
        })
    })
    .catch(error => {
        console.log('eeeeeeeeeeee',error)
        res.json({
            message : " an error occured"
        })
    })
    })

   
}

const login = async (req, res, next ) => {
    console.log('ccccc',req.body)
    var email = req.body.email
    var password = req.body.password
    
    User.findOne({ email:email })
    .then (user => {
        if(user){
            bcrypt.compare(password, user.password, function(err,result) {
                if(err) {
                    res.json({
                        error : err
                    })
                }
                if(result) {
                    let token = jwt.sign({ _id: user._id, role: user.role }, 'verySecretValue', {expiresIn : '1h'})
                    res.json({
                        message : 'Login Successfull',
                        token
                    })
                }else{
                    res.json({
                        message : 'Password does not matched'
                    })
                }
            })
        }else{
            res.json({
                message : 'No user found'
            })
        }
    })



    

}

 

module.exports = {
    register , login

}