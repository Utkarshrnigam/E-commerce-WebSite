const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller
const { createProduct } = require("../controllers/product");

// routes
router.post("/create-product", authCheck, adminCheck, createProduct);

module.exports = router;
