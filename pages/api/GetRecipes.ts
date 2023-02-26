import connectMongo from "../../utils/mongoConnect";
import Recipe from "../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";
import { Recipe as RecipeType } from "../../types/types";

export default async function GetRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, category, method } = req.query;

  if (req.method === "GET") {
    try {
      await connectMongo();
      let result;

      if (method === "search") {
        if (name) {
          result = await Recipe.find<RecipeType[]>({
            name: { $regex: name, $options: "i" },
          });
        } else {
          result = await Recipe.find<RecipeType[]>();
        }
      } else if (method === "filter") {
        if (category) {
          result = await Recipe.find<RecipeType[]>({ category });
        }
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
