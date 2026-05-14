const express = require("express");
const router = express.Router();

const {
  addSchool,
  listSchools,
} = require("../controllers/schoolController");

// @route   POST /addSchool
router.post("/addSchool", addSchool);

// @route   GET /listSchools
router.get("/listSchools", listSchools);

module.exports = router;