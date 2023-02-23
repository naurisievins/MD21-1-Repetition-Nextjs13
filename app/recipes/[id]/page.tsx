'use client'

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import '../../styles.css'

type CharByIdParams = {
  params: {
    id: string
  }
}

type Recipe = {
  _id: string,
  name: string,
  imgLink: string,
  content: string,
}

export default function CharById({ params }: CharByIdParams) {

  const id = params.id

  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`../api/${id}`)
      .then(res => {
        setRecipe(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err);
      })
  }, [id])

  return (
    <>
      {loading ?
        (<p>Loading...</p>) :
        error ?
          (<p>No data found.</p>) :

          recipe && (
            <div className='container'>
              <div className='recipe-full'>
                <div className='recipe__image'>
                  <img src={recipe.imgLink} alt={recipe.name} />
                </div>
                <span className='recipe__name'>{recipe.name}</span>
                <pre className='recipe__content'>{recipe.content}</pre>
              </div>
            </div>
          )}

    </>
  );
}