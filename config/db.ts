import mongoose from "mongoose";
const mongo_url = process.env.MONGO_URI! || "";

export default async function connnectDB() {
  try {
    await mongoose.connect(mongo_url).then(() => {
      console.log("Connected to Database");
    });
  } catch (error) {
    console.log("Error Connnecting To Mongo Database : ", error);
  }
}
