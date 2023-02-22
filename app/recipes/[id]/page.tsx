'use client'

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    axios.get(`../api/${id}`)
      .then(res => {
        setRecipe(res.data[0]);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [id])

  return (
    <>
      {loading ?
        (<h2>Loading...</h2>) :
        recipe && (
          <div style={{ border: '1px solid black' }} key={recipe._id}>
            <Image src={recipe.imgLink} alt={recipe.name} width={600} height={350} />
            <h2>{recipe.name}</h2>
            <p>{recipe.content}</p>
          </div>
        )}
    </>
  );
}
