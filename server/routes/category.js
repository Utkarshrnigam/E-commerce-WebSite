const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");
const {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/category");

router.get("/getCategories", getCategories);
router.get("/getCategory/:slug", getCategory);
router.post("/updateCategory/:slug", authCheck, adminCheck, updateCategory);
router.post("/createCategory", authCheck, adminCheck, createCategory);
router.post("/deleteCategory/:slug", authCheck, adminCheck, deleteCategory);

module.exports = router;
