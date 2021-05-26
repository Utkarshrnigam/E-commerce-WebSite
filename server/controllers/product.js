const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body.product);
    req.body.product.slug = slugify(req.body.product.title);
    const newProduct = await new Product(req.body.product).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};
