'use client'

import styles from './Form.module.scss'
import { useState } from 'react'
import { Recipe } from 'types/types'
import axios from 'axios'
import { FormProps } from 'types/types'
import { v4 as uuid } from 'uuid'
import { recipeInit, recipeSearchParamsInit } from 'utils/initValues'

export default function Form(
  {
    recipe,
    setShowAddForm,
    setShowEditForm,
    title,
    setRecipeSearchParams,
    categories,
    setRecipe
  }: FormProps) {

  const [formValues, setFormValues] = useState(recipe)
  const [showCategoryInput, setShowCategoryInput] = useState(false)

  const handleSubmit = (formValues: Recipe) => {
    axios.post('api/PostRecipe', { formValues })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setRecipe && setRecipe({
      ...recipe,
      name: formValues.name,
      imgLink: formValues.imgLink,
      content: formValues.content,
      category: formValues.category
    })

  }

  return (
    <div className={styles.form_container}>
      <span className={styles.title}>{title}</span>
      <form className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formValues);
          setFormValues(recipeInit);
          setShowAddForm && setShowAddForm(false);
          setShowEditForm && setShowEditForm(false);
          setRecipeSearchParams && setRecipeSearchParams({ ...recipeSearchParamsInit, refetch: true })
        }}
      >
        <label className={styles.form_label}>
          <span>Nosaukums</span>
          <input type="text"
            required
            placeholder="Nosaukums"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
        </label>

        <label className={styles.form_label}>
          <span>
            <span>Kategorija </span>
            {!formValues._id &&
              (<span>
                (<u onClick={() => setShowCategoryInput(!showCategoryInput)}>
                  {showCategoryInput ? 'Izvēlēties no esošajām' : 'Jauna kategorija'}</u>)
              </span>)
            }
          </span>
          {(categories && categories.length > 1 && !showCategoryInput) ?
            (<select
              value={formValues.category}
              className={styles.form_select}
              onChange={(e) => {
                console.log(formValues.category)
                setFormValues({ ...formValues, category: e.target.value })
              }}
              required
            >
              <option value="" disabled hidden>Izvēlieties kategoriju</option>
              {categories.map(category => (
                <option key={uuid()} value={category}>{category}</option>
              ))}
            </select>) :
            (
              <input type="text"
                required
                placeholder="Kategorija"
                value={formValues.category}
                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
              />
            )}
        </label>

        <label className={styles.form_label}>
          Bilde
          <input type="text"
            required
            placeholder="Saite uz bildi"
            value={formValues.imgLink}
            onChange={(e) => setFormValues({ ...formValues, imgLink: e.target.value })}
          />
        </label>

        <label className={styles.form_label}>
          Receptes apraksts
          <textarea placeholder="Receptes apraksts..."
            required
            value={formValues.content}
            onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
          />
        </label>

        <button>Apstiprināt</button>
      </form>
    </div>
  )
}
