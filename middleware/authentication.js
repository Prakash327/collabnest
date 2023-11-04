const User = require('../models/User')
const jwt = require('jsonwebtoken')
 const {UnauthenticatedError }= require('../errors')


const auth = async (req,res,next)=>{
//check header for authorization 
const authHeader = req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Aunthentication invalid')

}
const token = authHeader.split(' ')[1]
try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //from here it goes to next route if authorized 
    req.user = { userId: payload.userId, name:payload.name}
    next();
} catch (error) {
    throw new UnauthenticatedError('try again')
}

}

module.exports= auth;