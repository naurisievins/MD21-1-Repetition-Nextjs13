'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import { Recipe } from 'types/types'
import Filter from './components/Filter/Filter'
import getCategories from 'utils/getCategories'
import Search from './components/Search/Search'
import Recipes from './components/Recipes/Recipes'
import styles from './page.module.scss'
import Form from './components/Form/Form'
import { recipeInit, recipeSearchParamsInit } from 'utils/initValues'
import connectMongo from '../utils/mongoConnect'

export default function Main() {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [recipeSearchParams, setRecipeSearchParams] = useState(recipeSearchParamsInit)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    connectMongo();

    getCategories().then((categories) => {
      categories && setCategories(categories)
    })

    axios.get('../api/GetRecipes', { params: recipeSearchParams })
      .then(res => {
        console.log('axios get pie useeffect', res.data)
        setRecipes(res.data);
      })
      .catch(err => {
        console.log(err);
      });


    setRecipeSearchParams(recipeSearchParamsInit)
    setLoading(false)

  }, [recipeSearchParams])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.top_option_bar}>
        <Search setRecipeSearchParams={setRecipeSearchParams} />
        <button className={styles.add_recipe_btn}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Aizvērt formu' : 'Pievienot recepti'}
        </button>
      </div>
      <h2 className={styles.title}>Lieliskas receptes</h2>
      <div className={styles.filter_container}>
        {!showAddForm && <Filter categories={categories} setRecipeSearchParams={setRecipeSearchParams} />}
      </div>
      <div className={styles.container}>
        {showAddForm ?
          <Form recipe={recipeInit}
            setShowAddForm={setShowAddForm}
            title={"Pievienot recepti"}
            setRecipeSearchParams={setRecipeSearchParams}
            categories={categories}
          />
          :
          (<>
            {/* {recipes.length === 0 && (<p>Nekas netika atrasts!</p>)} */}
            <Recipes recipes={recipes} />
          </>)
        }

      </div>
    </div>
  )
}
