import mongoose from "mongoose";

const dbConnection = async (req, res, next) => {
  if (mongoose.connection.readyState === 0)
    await mongoose.connect(process.env.MONGODB_URL);

  await next();
};

export default dbConnection;
