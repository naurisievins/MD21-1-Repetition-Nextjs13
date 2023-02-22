'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Recipe = {
  _id: string,
  name: string,
  imgLink: string,
  content: string,
}

export default function Recipes() {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    axios.get('api/GetRecipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, [])

  return (

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <h2>Recipes</h2>
      {recipes.map((recipe: Recipe) => (
        <Link href={`recipes/${recipe._id}`} key={recipe._id}>
          <div style={{ border: '1px solid black' }}>
            <Image src={recipe.imgLink} alt={recipe.name} width={600} height={350} />
            <h2>{recipe.name}</h2>
            <p>{recipe.content}</p>
          </div>
        </Link>
      ))}
    </div>

  )
}
