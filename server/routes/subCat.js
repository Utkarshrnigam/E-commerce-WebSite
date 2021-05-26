const express = require("express");

const router = express.Router();
const { authCheck, adminCheck } = require("../middleware/auth");
const {
  getSubCats,
  getSubCat,
  updateSubCat,
  createSubCat,
  deleteSubCat,
} = require("../controllers/subCat");

router.post("/getSubCats", getSubCats);
router.get("/getSubCat/:slug", getSubCat);
router.post("/updateSubCat/:slug", authCheck, adminCheck, updateSubCat);
router.post("/createSubCat", authCheck, adminCheck, createSubCat);
router.post("/deleteSubCat/:slug", authCheck, adminCheck, deleteSubCat);

module.exports = router;
