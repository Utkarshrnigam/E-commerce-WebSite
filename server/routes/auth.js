const express = require("express");

const router = express.Router();
const { addOrUpdateUser, getCurrrentUser } = require("../controllers/auth");
const { authCheck, adminCheck } = require("../middleware/auth");

router.post("/addOrUpdateUser", authCheck, addOrUpdateUser);
router.post("/getCurrrentUser", authCheck, getCurrrentUser);
router.post("/adminCheck", authCheck, adminCheck, getCurrrentUser);

module.exports = router;
