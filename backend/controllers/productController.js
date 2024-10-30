const cloudinary = require('cloudinary').v2;

const productModel = require('../models/productModel');
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const images = [image1, image2, image3].filter((item) => item != undefined)
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(images);
    
        let imageURL = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url;
            }
            ))
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestseller:bestseller==="true"?true:false,
            image:imageURL,
            date:Date.now()
        }
        const product=new productModel(productData)
        await product.save()
        res.json({
            success:true,
            message:"Product Added Successfully",
            data:productData
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      success: true,
      message: "Products Listed Successfully",
      products: products
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};



 const removeProduct = async (req, res) => {
    try {
        const { id } = req.body; // Destructure id from request body
        await productModel.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Product Removed Successfully"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};



module.exports = { addProduct, listProduct, removeProduct }


