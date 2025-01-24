// models/userSchema.js
const mongoose=require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.static("matchPasswordAndGenerateToken",async function(name,email,password){
        const user = await this.findOne({name, email });
        if (!user) throw new Error("User not found!");
        if(password!=user.password)
        {
                   throw new Error("Incorrect Password");
        }
  const token = createTokenForUser(user);
  return token;


});

const User = mongoose.model("user", userSchema);


  module.exports=User;
