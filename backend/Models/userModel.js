const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");
const { schema } = require("./messageModel");

const userModule = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { 
      type: String, 
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
  },
  {
    timestamps: true, 
  }
);

// userModule.method('comparePassword', async function(enteredPassword){
    // const isMatch = await bcrypt.compare(enteredPassword, this.password);
    // return isMatch;
// });

// schema.pre('save', async function() {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);

// });
const User = mongoose.model("User", userModule);

module.exports = User;
