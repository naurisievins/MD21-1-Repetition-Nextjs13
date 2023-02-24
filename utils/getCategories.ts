import axios from "axios";
import { CategoryObject } from "types/types";

const getCategories = async () => {
  try {
    let res = await axios.get(`../api/GetCategories`);
    const categoriesObjects: CategoryObject[] = res.data;
    const categories: string[] = categoriesObjects.map(
      (category: CategoryObject) => category.category
    );
    const uniqueCategories: string[] = [...new Set(categories)];
    return uniqueCategories;
  } catch (err) {
    console.log(err);
  }
};

export default getCategories;
