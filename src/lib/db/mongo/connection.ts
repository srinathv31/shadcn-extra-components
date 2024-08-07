// lib/db/mongo/connection.js
import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/merchant";

let isConnected: mongoose.ConnectionStates | null = null;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = mongoose.connections[0].readyState;
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to database", err);
    setTimeout(connectToDatabase, 5000); // Retry connection after 5 seconds
  }
}

await connectToDatabase();
