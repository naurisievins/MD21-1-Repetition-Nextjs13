'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'
import { Recipe, RecipeSearchParams } from 'types/types'
import Filter from './components/Filter/Filter'
import getCategories from 'utils/getCategories'
import Search from './components/Search/Search'
import Recipes from './components/Recipes/Recipes'
import Form from './components/Form/Form'

export default function Main() {

  const recipeSearchParamsInit: RecipeSearchParams = {
    name: '',
    category: '',
    method: 'search',
  }

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [recipeSearchParams, setRecipeSearchParams] = useState(recipeSearchParamsInit)
  const [showAddForm, setShowAddForm] = useState(false)
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories().then((categories) => {
      categories && setCategories(categories)
    })

    axios.get('../api/GetRecipes', { params: recipeSearchParams })
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    // setLoading(false)
  }, [recipeSearchParams])

  // if (loading) {
  //   return <p>Loading...</p>
  // }

  return (
    <div className='wrapper'>
      <h2 className='title'>Lieliskas receptes</h2>
      <div className="filter_container">
        <Filter categories={categories} setRecipeSearchParams={setRecipeSearchParams} />
        <Search setRecipeSearchParams={setRecipeSearchParams} />

      </div>
      <div className='container'>
        {recipes.length === 0 && (<p>Nekas netika atrasts!</p>)}
        <Recipes recipes={recipes} />
      </div>
    </div>
  )
}
