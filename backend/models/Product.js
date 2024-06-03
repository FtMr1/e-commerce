const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  text: { type: String, require: true },
  rating: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true }
);

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    img: [{ type: String, require: true }],
    reviews: [ReviewSchema],

    colors: [{ type: String, required: true }],
    sizes: [{ type: String, required: true }],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, require: true },
    
  },

  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
