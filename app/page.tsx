'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'
import spliceContent from 'utils/spliceContent'
import { Recipe } from 'types/types'
import Filter from './components/Filter'
import getCategories from 'utils/getCategories'

export default function Recipes() {

  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    getCategories().then((categories) => {
      categories && setCategories(categories)
    })

    axios.get('../api/GetRecipes')
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (

    <div className='wrapper'>
      <h2 className='title'>Lieliskas receptes</h2>
      <div className="filter_container">
        <Filter categories={categories} />
      </div>
      <div className='container'>
        {recipes.map((recipe: Recipe) => (
          <Link href={`${recipe._id}`} key={recipe._id}>
            <div className='recipe'>
              <Image src={recipe.imgLink}
                alt={recipe.name}
                width={300}
                height={175}
                className='recipe__image' />
              <span className='recipe__name'>{recipe.name}</span>
              <span>Kategorija: {recipe.category}</span>
              <p className='recipe__content'>{spliceContent(recipe.content)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}
