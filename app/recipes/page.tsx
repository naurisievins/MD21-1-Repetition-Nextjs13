'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles.css'

type Recipe = {
  _id: string,
  name: string,
  imgLink: string,
  content: string,
}

export default function Recipes() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get('../api/GetRecipes')
      .then(res => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading data.</p>
  }

  const shortContent = (content: string) => {
    const result = content.split('\n').join(' ').split(' ').splice(0, 10).join(' ') + '... Read more';
    return result
  }

  return (

    <div className='wrapper'>
      <h2 className='title'>Recipes</h2>
      <div className='container'>
        {recipes.map((recipe: Recipe) => (
          <Link href={`recipes/${recipe._id}`} key={recipe._id}>
            <div className='recipe'>
              <Image src={recipe.imgLink}
                alt={recipe.name}
                width={300}
                height={175}
                className='recipe__image' />
              <span className='recipe__name'>{recipe.name}</span>
              <p className='recipe__content'>{shortContent(recipe.content)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}
