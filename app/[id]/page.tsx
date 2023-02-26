'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import '../styles.css'
import { Recipe, CharByIdParams } from "types/types";
import Link from "next/link";
import styles from './page.module.scss'
import Form from "app/components/Form/Form";

export default function CharById({ params }: CharByIdParams) {

  const id = params.id
  const [recipe, setRecipe] = useState<Recipe>()
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    axios.get(`../api/${id}`)
      .then(res => {
        setRecipe(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])

  return (
    <div className={styles.container}>
      {recipe && (
        <div className={styles.recipe_full}>
          <div className={styles.top_menu}>
            <Link href="/">
              <button>&#8656; Atpakaļ</button>
            </Link>
            <button onClick={() => setShowEditForm(!showEditForm)}>
              {showEditForm ?
                'Aizvērt' :
                <>&#9998; Labot</>
              }
            </button>
          </div>
          {(showEditForm && recipe) ? <Form recipe={recipe} /> :
            (<>
              <div className={styles.recipe_image}>
                <img src={recipe.imgLink} alt={recipe.name} />
              </div>
              <span className={styles.recipe_name}>{recipe.name}</span>
              <pre className={styles.recipe_content}>{recipe.content}</pre>
            </>)
          }



        </div>
      )}
    </div>
  );
}