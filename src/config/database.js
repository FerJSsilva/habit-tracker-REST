import mongoose from "mongoose";

export const connectToDatabase = () => {
  const uri = process.env.DATABASE_URL;

  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  mongoose
    .connect(uri, clientOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
}
