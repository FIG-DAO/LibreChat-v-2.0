const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

async function connectDb() {
  if (!MONGO_URI) throw new Error('No MONGO_URI in .env');
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB Connected');
}

module.exports = { connectDb };
