const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema([{
    userName: {
        type: String,
        required: [true, 'User Name is necessary'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is necessary']
    },
    password: {
        type: String,
        required: [true, 'Password is necessary']
    }
}]);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);