const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  feature:{
    type:[String],
    required:true
  }
});

module.exports = mongoose.model("services", serviceSchema);
