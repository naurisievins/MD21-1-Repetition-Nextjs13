import connectMongo from "../../utils/mongoConnect";
import Recipe from "../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PostRecipe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectMongo();

      const recipe = new Recipe({
        name: "Kartupelis",
        imgLink: "https://",
        content: "fsafaf",
        date: new Date(),
      });

      await recipe.save();

      res.status(200).json({ message: "Recipe added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
