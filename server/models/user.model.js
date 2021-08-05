const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        unique: [true, "Username ya existe, intente con uno diferente"],
        required: [true, "Este campo es requerido"]        
    },
    email: {
       type: String,
       unique: [true, "Email ya existe, intente con uno diferente"],
       required: [true, "Este campo es requerido"]
    },
    password: {
        type: String,
        required: [true, "Este campo es requerido"]
    },
    online: {
      type: Boolean,
      default: false
    }
    
},
{timestamps: true}
);

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);

module.exports = User;