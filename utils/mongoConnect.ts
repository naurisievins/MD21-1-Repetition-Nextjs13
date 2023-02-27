import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", false);

async function mongoConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nrnk.zq3cas7.mongodb.net/recipes?retryWrites=true&w=majority`
  );
}

export default mongoConnect;
