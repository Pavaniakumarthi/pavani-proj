// controllers/enquiryController.js
const db = require("../models");
const Enquiry = db.Enquiry;

exports.createPublicEnquiry = async (req, res) => {
  const { name, email, courseInterest } = req.body;
  try {
    if (!name || !email)
      return res.status(400).json({ message: "Name and email required" });

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      claimed: false,
    });

    res.status(201).json({ message: "Enquiry submitted", enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPublicEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { claimed: false } });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPrivateEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: { counselorId: req.user },
    });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.claimEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Not found" });
    if (enquiry.claimed)
      return res.status(409).json({ message: "Already claimed" });

    enquiry.claimed = true;
    enquiry.counselorId = req.user;
    await enquiry.save();

    res.json({ message: "Lead claimed", enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
