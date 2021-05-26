const SubCat = require("../models/subCat");
const slugify = require("slugify");
var mongoose = require("mongoose");

exports.getSubCats = async (req, res, next) => {
  try {
    const parent = req.body.parent;
    const subCats = await SubCat.find({
      parentCat: mongoose.Types.ObjectId(parent),
    }).exec();
    res.json(subCats);
  } catch (err) {
    res.status(400).json("something went wrong");
  }
};

exports.getSubCat = async (req, res, next) => {
  const subCat = await SubCat.find({ slug: req.params.slug }).exec();
  res.json(subCat);
};
exports.createSubCat = async (req, res, next) => {
  try {
    const { name, parent } = req.body;
    console.log("name", name, parent);
    const subCat = await new SubCat({
      name,
      parentCat: mongoose.Types.ObjectId(parent),
      slug: slugify(name),
    }).save();

    res.json(subCat);
  } catch (err) {
    console.log(err);
    res.status(400).json("Cannot create new SubCat");
  }
};

exports.updateSubCat = async (req, res, next) => {
  const { name } = req.body;

  try {
    const subCat = await SubCat.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(subCat);
  } catch (err) {
    res.status(400).json("Cannot Update the SubCat");
  }
};

exports.deleteSubCat = async (req, res, next) => {
  try {
    const subCat = await SubCat.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(subCat);
  } catch (err) {
    res.status(400).json("Cannot delete the SubCat");
  }
};
