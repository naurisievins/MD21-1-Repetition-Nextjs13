import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    imgLink: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
  },
  { versionKey: false }
);

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
