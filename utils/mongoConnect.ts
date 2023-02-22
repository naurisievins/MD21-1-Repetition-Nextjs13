import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function mongoConnect() {
  await mongoose.connect(
    "mongodb+srv://cook:recipes666@nrnk.zq3cas7.mongodb.net/recipes?retryWrites=true&w=majority"
  );
}

export default mongoConnect;
