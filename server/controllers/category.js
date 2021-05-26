const Category = require("../models/category");
const slugify = require("slugify");

exports.getCategories = async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.json(categories);
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.find({ slug: req.params.slug }).exec();
  res.json(category);
};
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();

    res.json(category);
  } catch (err) {
    res.status(400).json("Cannot create new Category");
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(category);
  } catch (err) {
    res.status(400).json("Cannot Update the category");
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(category);
  } catch (err) {
    res.status(400).json("Cannot delete the category");
  }
};
