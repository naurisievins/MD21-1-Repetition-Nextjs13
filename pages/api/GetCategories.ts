import connectMongo from "../../utils/mongoConnect";
import Recipe from "../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";
import { Recipe as RecipeType } from "types/types";

export default async function GetCategories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectMongo();

      const result = await Recipe.find<RecipeType[]>(
        {},
        { name: 0, _id: 0, imgLink: 0, content: 0, date: 0 }
      );

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
