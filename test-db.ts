import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/Omni?retryWrites=true&w=majority";

async function testConnection() {
  console.log("Testing connection to:", uri.replace(/\/\/.*@/, '//****:****@'));
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("FAILURE: Could not connect to MongoDB Atlas.");
    console.error("Error details:", err instanceof Error ? err.message : String(err));
    if (err instanceof Error && err.message.includes('ETIMEDOUT')) {
      console.log("\nSUGGESTION: This is a network timeout. Please ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.");
    }
  }
  process.exit();
}

testConnection();
