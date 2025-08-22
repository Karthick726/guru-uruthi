const express = require("express");
const router = express.Router();
const Contact = require("../Controller/ContactController");

const VerifyToken = require("./VerifyToken/VerifyToken");

router.post("/add-bulk-order", Contact.addContact);

router.get("/get-bulk-order", VerifyToken, Contact.getContacts);


module.exports = router;
