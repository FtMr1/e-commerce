const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    img: { type: String, require: true },
  },

  { timestamps: true }
);


const Category = mongoose.model("Category" , CategorySchema)
module.exports= Category;