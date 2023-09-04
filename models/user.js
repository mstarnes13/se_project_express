const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "This is not a Link",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "This is not a valid email",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect password or email"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect password or email"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("users", user);
