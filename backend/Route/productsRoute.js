const express = require("express");
const router = express.Router();
const products=require("../Controller/productsController")
const VerifyToken = require("./VerifyToken/VerifyToken");
const upload=require("../cloundinary/upload")

router.post("/add-products", VerifyToken,upload.fields([{name:'image',maxCount:1}]),products.addProducts);

router.post("/update-products", VerifyToken,upload.fields([{name:'image',maxCount:1}]),products.updateProducts);

router.post("/delete-products", VerifyToken,products.deleteProducts);


router.get("/get-products",products.getProducts)


module.exports = router;
