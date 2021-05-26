const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Too Short Name"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parentCat: {
      type: Schema.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCat", subCatSchema);
