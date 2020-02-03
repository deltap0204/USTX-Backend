var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const admin_userSchema = new Schema({
    Name: String,
    Password: String,
    BuyAmount: Number,
    SellAmount: Number,
    UserCount: Number,
    TokenPrice: Number
}, { timestamps: true });

//admin_userSchema.pre('save', function(callback){                                             
//  var user = this;                                                                              
//  if (!user.isModified('Password')) return callback();                                          
//  bcrypt.genSalt(5, function(err, salt){                                                        
//    if (err) return callback();                                                                 
//                                                                                                
//    bcrypt.hash(user.Password, salt, null, function(err, hash){                                 
//      if (err) return callback();                                                               
//        user.Password = hash;                                                                   
//        callback();                                                                             
//    });                                                                                         
//  });                                                                                           
//});                                                                                             
                                                                                                
admin_userSchema.methods.generateJWTPassword = function(password, callback){                               
  bcrypt.genSalt(5, function(err, salt){                                                        
    if (err) 
			return callback(err);                                                                 
                                                                                                
    bcrypt.hash(password, salt, null, function(err, hash){                                 
      if (err) 
			  return callback(err);                                                               

      callback(null, hash);
    });                                                                                         
  });                                                                                           
};    
                                                                                                
admin_userSchema.methods.verifyPassword = function(password, callback){                               
  bcrypt.compare(password, this.Password, function(err, isMatch){                               
    if (err)                                                                                    
      return callback(err);                                                                     
                                                                                                
    callback(null, isMatch);                                                                    
  });                                                                                           
};    




module.exports = mongoose.model('AdminModel', admin_userSchema);
