import connectMongo from "../../utils/mongoConnect";
import Recipe from "../../models/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PostRecipe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const recipeForm = req.body.formValues;
    const { _id: id } = recipeForm;
    const userKey = req.body.key;
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

    console.log("userKey", userKey);
    console.log("accessKey", accessKey);

    if (userKey === accessKey) {
      try {
        await connectMongo();

        let recipe;

        if (!id) {
          recipe = new Recipe(recipeForm);
          await recipe.save();
        } else {
          await Recipe.findOneAndUpdate({ _id: id }, recipeForm);
        }

        res.status(200).json({ message: "Recipe added successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
}
