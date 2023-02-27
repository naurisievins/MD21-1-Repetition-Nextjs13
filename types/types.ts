import { Ref } from "react";

export type Recipe = {
  _id?: string;
  name: string;
  imgLink: string;
  content: string;
  category: string;
};

export type CharByIdParams = {
  params: {
    id: string;
  };
};

export type CategoryObject = {
  category: string;
};

export type FilterProps = {
  categories: string[];
  setRecipeSearchParams: Function;
};

export type RecipeSearchParams = {
  name: string;
  category: string;
  method: "search" | "filter";
};

export type FormProps = {
  recipe: Recipe;
  setShowAddForm?: Function;
  setShowEditForm?: Function;
  title: string;
  categories?: string[];
  setRecipeSearchParams?: Function;
  setRecipe?: Function;
};

export type RecipeProps = {
  recipes: Recipe[];
};

export type HeaderParams = {
  setRecipeSearchParams: Function;
};
