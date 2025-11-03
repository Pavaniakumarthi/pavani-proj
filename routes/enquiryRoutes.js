// routes/enquiryRoutes.js
const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");
const { authMiddleware } = require("../middleware/authMiddleware");

// 🟢 Public route: create new enquiry
router.post("/", enquiryController.createPublicEnquiry);

// 🟢 Public route: get all public enquiries
router.get("/", enquiryController.getPublicEnquiries);

// 🔒 Private route: counselor’s own enquiries
router.get("/my", authMiddleware, enquiryController.getPrivateEnquiries);

// 🔒 Private route: claim an enquiry
router.post("/:id/claim", authMiddleware, enquiryController.claimEnquiry);

module.exports = router;
