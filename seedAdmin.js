// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path as necessary

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const adminData = {
      username: 'admin',
      password: 'adminpassword', // This will be hashed in the User pre-save hook
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: adminData.username });
    if (existingAdmin) {
      console.log('Admin already exists.');
    } else {
      await User.create(adminData);
      console.log('Admin user created successfully.');
    }
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
  }
};

createAdminUser();
