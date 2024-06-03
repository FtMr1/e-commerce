const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user" , enum:["user" , "admin"]},
    avatar: { type: String },
  },

  { timestamps: true }
);


const User = mongoose.model("User" , UserSchema)
module.exports= User;