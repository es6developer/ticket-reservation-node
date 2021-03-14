import mongoose from 'mongoose';
var crypto = require('crypto');
const Schema = mongoose.Schema;
 
const UserModel = new Schema({
    mobile_number: { type: String, default: "",unique : true },
    name: { type: String, default: "" },
    gender: { type: String, default: "" },
    password :{ type: String, default: "" },
    salt :{ type: String, default: "" },
    created_at: { type: Date, default: Date.now }
});
UserModel.methods.setPassword = function(password) { 
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
       // Hashing user's salt and password with 1000 iterations, 
       this.password = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 

   UserModel.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.password === hash; 
};


export const User = mongoose.model('user', UserModel);