require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../../src/config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function seed(){
  await connectDB();
  const email = 'admin@example.com';
  const exists = await User.findOne({ email });
  if (exists) { console.log('Seed user exists'); process.exit(0); }
  const hash = await bcrypt.hash('P@ssw0rd123', 12);
  const user = await User.create({ email, password: hash, name: 'Super Admin', roles: ['Super Admin'], isVerified: true });
  console.log('Created user', user.email);
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1) });
