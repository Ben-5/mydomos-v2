var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userRef:        String,
    userLastname:   String,
    userFirstname:  String,
    userEmail:      String,
    salt:           String,
    userPassword:   String,
    token:          String,
    userBirthday:   Date,
    userAddress:    String,
    userZIP:        String,
    userCity:       String,
    userAvatar:     String
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;