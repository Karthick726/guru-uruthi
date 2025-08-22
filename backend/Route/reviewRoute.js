const express = require("express");
const router = express.Router();
const reviews=require('../Controller/reviewController')
const upload = require("../cloundinary/upload");
const verifyToken = require("./VerifyToken/VerifyToken");

router.post('/addreview',verifyToken,upload.fields([{name:'image',maxCount:1}]),reviews.postReview);

router.get('/getreview',reviews.getReview);

router.post('/deletereview',verifyToken,reviews.deleteReview);

module.exports = router;