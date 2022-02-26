var mongoose=require('mongoose');
var crypto=require('crypto'); //Encrypt data4

var userSchema=new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    //Encrypted passwords
    hash:String,
    salt:String,
    faceBookId:String,
    googleId:String
});

//Making pwd Secure
userSchema.methods.setPassword = function(password){
    this.salt=crypto.randomBytes(16).toString('hex');
    this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha1').toString('hex');
};

//check for correctness
userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha1').toString('hex');
    return this.hash=== hash;
};
module.exports=mongoose.model('user',userSchema);