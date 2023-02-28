import Link from "next/link";
import Image from "next/image";
import spliceContent from "utils/spliceContent";
import { Recipe } from "types/types";
import styles from "./Recipes.module.scss";
import { RecipeProps } from "types/types";

export default function Recipes({ recipes }: RecipeProps) {

  return (
    <>
      {
        recipes.map((recipe: Recipe) => (
          <Link href={`${recipe._id}`} key={recipe._id}>
            <div className={styles.recipe}>
              <Image src={recipe.imgLink}
                alt={recipe.name}
                width={300}
                height={175}
                className={styles.recipe_image} />
              <span className={styles.recipe_name}>{recipe.name}</span>
              <span className={styles.recipe_category}>Kategorija: {recipe.category}</span>
              <p className={styles.recipe_content}>{spliceContent(recipe.content)}</p>
            </div>
          </Link>
        ))
      }
    </>
  )
}