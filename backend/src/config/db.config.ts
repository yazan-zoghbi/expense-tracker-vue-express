import mongoose from "mongoose";

export const dbConnect = async (mongoUrl: string): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (err: any) {
    console.error("🚨 Initial DB connection failed:", err.message);
    process.exit(1);
  }
};
