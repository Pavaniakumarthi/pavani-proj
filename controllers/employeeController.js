const db = require('../models');
const Employee = db.Employee;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });
    const existing = await Employee.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Employee exists' });
    const hashed = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ email, password: hashed, name });
    res.status(201).json({ message: 'Employee registered', employee: { id: employee.id, email: employee.email, name: employee.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, employee.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
