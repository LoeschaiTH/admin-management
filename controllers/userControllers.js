// controllers/userController.js
const { log } = require('console');
const User = require('../models/user');
const mongoose = require('mongoose');

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/management', { title: 'สมาชิก', message: 'Users management', users });
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
};

// ฟังก์ชันเพิ่มผู้ใช้
exports.addUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // สร้าง user ใหม่
    const newUser = new User({ name, age, email });

    // บันทึก user ลงในฐานข้อมูล
    const savedUser = await newUser.save();

    // ส่งกลับ user ที่เพิ่งบันทึก
    res.json({
      success: true,
      message: 'User added successfully',
      user: savedUser, // ส่ง user กลับไปด้วย
    });
  } catch (err) {
    // ส่งข้อความข้อผิดพลาดกลับไปยัง client
    res.status(500).json({
      success: false,
      message: err.message || 'An error occurred while adding the user',
    });
  }
};


// ฟังก์ชันลบผู้ใช้
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }

  try {
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};


// ฟังก์ชันแก้ไขข้อมูลผู้ใช้
exports.editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { title: 'Edit User', user });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    }, { new: true });
    res.redirect('/management');
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
