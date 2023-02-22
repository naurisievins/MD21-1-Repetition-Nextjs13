import connectMongo from "../../utils/mongoConnect";
import Recipe from "../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectMongo();

      const result = await Recipe.find();

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
