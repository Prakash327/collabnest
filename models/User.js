const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name cannot be empty!!! please provide name'],
        minLength:5,
        maxLength:30,
    },
    email:{
        type:String,
        required:[true,'Please provide an Email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide valid email'],
    
    unique:true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minLength:4,
        
    }
})

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
    next()

})
UserSchema.methods.createJWT = function (){
    return jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword= async function(validatePassword){
const isMatch = await bcrypt.compare(validatePassword,this.password)
return isMatch
}
module.exports = mongoose.model('user',UserSchema)