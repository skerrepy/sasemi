var mongoose = require('mongoose');
const passportLocalMongoose= require('passport-local-mongoose');
// User - email,name
var userSchema = new mongoose.Schema({
   email:String,
   username:String,
   password:String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);