const reviewModel = require("../Schema/reviewSchema");
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.postReview = async (req, res) => {
  try {
    const { rating, review, name } = req.body;
    const image = req.files["image"][0];

     async function processImage(imageBuffer, maxSizeKB) {
         const imageString = imageBuffer.toString("base64");
   
         const result = await cloundinary.uploader.upload(
           `data:image/jpeg;base64,${imageString}`,
           {
             folder: "reviews-Images",
             resource_type: "image",
           }
         );
   
         return result.secure_url;
       }
       const image_url = await processImage(image.buffer, 1000);
    const Review = new reviewModel({
      rating,
      review,
      name,
      image: image_url,
    });
    await Review.save();
    res.status(200).json({ message: "Review Added Successfully", Review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Image upload failed", err });
  }
};

exports.getReview=async(req,res)=>{
  try {
    const Review = await reviewModel.find();
    res.status(200).json( Review );
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Image upload failed", err });
  }
}

exports.deleteReview=async(req,res)=>{
  try {
    const {id}=req.body;
    const Review = await reviewModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Review Deleted Successfully" });  
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Image upload failed", err });
  }
}