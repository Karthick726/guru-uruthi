const products = require("../Schema/ProductsSchema");
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.addProducts = async (req, res) => {
  try {
    const { benefits, description, name } = req.body;
    const image = req.files["image"][0];
    async function processImage(imageBuffer, maxSizeKB) {
      const imageString = imageBuffer.toString("base64");

      const result = await cloundinary.uploader.upload(
        `data:image/jpeg;base64,${imageString}`,
        {
          folder: "Service-Images",
          resource_type: "image",
        }
      );

      return result.secure_url;
    }
    const image_url = await processImage(image.buffer, 1000);

    const newProducts = new products({
      name,
      description,
      benefits,

      image: image_url,
    });
    await newProducts.save();
    res.status(200).json({ message: "Products Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in Adding Products" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const newProducts = await products.find();
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(500).json({ message: "Products are failed to fetch", err });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteProduct = await products.findByIdAndDelete(id);
    res.status(200).json({ message: "products Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "products delete failed", err });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { benefits, description, name, id } = req.body;
    let image;

    const existingProducts = await products.findById(id);

    if (!existingProducts) {
      return res.status(404).json({ message: "Products not found" });
    }

    if (req.files && req.files["image"]) {
      image = req.files["image"][0];
      async function processImage(imageBuffer, maxSizeKB) {
        const imageString = imageBuffer.toString("base64");

        const result = await cloundinary.uploader.upload(
          `data:image/jpeg;base64,${imageString}`,
          {
            folder: "Service-Images",
            resource_type: "image",
          }
        );

        return result.secure_url;
      }
      image = await processImage(image.buffer, 1000);
    } else {
      image = existingProducts.image;
    }

    const updateProducts = await products.findByIdAndUpdate(
      id,
      {
        image,
        name,
        description,
        benefits,
      },
      {
        new: true,
      }
    );

    if (!updateProducts) {
      return res.status(404).json({ message: "Products not found" });
    } else {
      return res.status(200).json(updateProducts);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
