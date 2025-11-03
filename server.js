const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public'));



// Import routes
const employeeRoutes = require("./routes/employeeRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
app.use("/api/enquiries", require("./routes/enquiryRoutes"));


// Use routes
app.use("/api/employees", employeeRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("CRM API is running.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
