const  mongoose  = require("mongoose");


const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true, 
    },
    country: {
      type: String,
      required: true,
    },
    products: [
      {
        type: String, 
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Bulkcontacts", ContactSchema);
