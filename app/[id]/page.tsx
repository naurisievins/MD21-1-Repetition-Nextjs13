'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import '../styles.css'
import { Recipe, CharByIdParams } from "types/types";
import Link from "next/link";

export default function CharById({ params }: CharByIdParams) {

  const id = params.id
  const [recipe, setRecipe] = useState<Recipe>()

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
    <div className='container'>
      {recipe && (
        <div className='recipe-full'>
          <Link href="/">
            <b>- Back -</b>
          </Link>
          <div className='recipe__image'>
            <img src={recipe.imgLink} alt={recipe.name} />
          </div>
          <span className='recipe__name'>{recipe.name}</span>
          <pre className='recipe__content'>{recipe.content}</pre>
        </div>
      )}
    </div>
  );
}