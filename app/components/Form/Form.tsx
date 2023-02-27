'use client';

import styles from './Form.module.scss';
import { useState, useEffect } from 'react';
import { Recipe } from 'types/types';
import axios from 'axios';
import { FormProps } from 'types/types';
import { v4 as uuid } from 'uuid';
import { recipeInit, recipeSearchParamsInit } from 'utils/initValues';
import { nameValidation, urlValidation, contentValidation, categoryValidation } from 'utils/validation';
import showErrorMessage from 'utils/showErrorMessage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authorized from 'utils/authorized';
import passwordToast from 'utils/passwordToast';
import getSessionKey from 'utils/getSessionKey';
import passwordPrompt from 'utils/passwordPrompt';

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

  const [formValues, setFormValues] = useState(recipe);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [invalidInput, setInvalidInput] = useState(recipeInit);

  useEffect(() => {
    const validInput = Object.values(invalidInput).every(value => value === 'valid')

    // Toasts and authorization check for edit recipe
    if (validInput && formValues._id) {

      const recipeEdited = () => {
        handleSubmit(formValues, getSessionKey());
        toast.success("Recepte izlabota!")
      }

      if (authorized()) {
        recipeEdited();
      } else {
        passwordPrompt();
        if (passwordToast()) {
          recipeEdited();
        };
      }

      // Toasts and authorization check for add recipe
    } else if (validInput && !formValues._id) {

      const recipeAdded = () => {
        handleSubmit(formValues, getSessionKey());
        toast.success("Jauna recepte pievienota!")
      }

      if (authorized()) {
        recipeAdded();
      } else {
        passwordPrompt();
        if (passwordToast()) {
          recipeAdded();
        };
      }
    }

    // eslint-disable-next-line
  }, [invalidInput]);



  const validateInput = () => {
    setInvalidInput({
      name: nameValidation(formValues.name) ? nameValidation(formValues.name) : 'valid',
      imgLink: urlValidation(formValues.imgLink) ? urlValidation(formValues.imgLink) : 'valid',
      category: categoryValidation(formValues.category) ? categoryValidation(formValues.category) : 'valid',
      content: contentValidation(formValues.content) ? contentValidation(formValues.content) : 'valid'
    })
  }

  const handleSubmit = (formValues: Recipe, key: string | null | undefined) => {

    axios.post('api/PostRecipe', { formValues, key })
      .then(res => {
        console.log(res);
        setRecipeSearchParams && setRecipeSearchParams({ ...recipeSearchParamsInit, refetch: true });
      })
      .catch(err => console.log(err));

    // To update recipe after editing
    setRecipe && setRecipe({
      ...recipe,
      name: formValues.name,
      imgLink: formValues.imgLink,
      content: formValues.content,
      category: formValues.category
    })

    setFormValues(recipeInit);
    setShowAddForm && setShowAddForm(false);
    setShowEditForm && setShowEditForm(false);
  }

  return (
    <div className={styles.form_container}>
      {!formValues._id &&
        (<div className={styles.close_form_btn}
          onClick={() => setShowAddForm && setShowAddForm(false)}
        >
          [x]
        </div>)
      }
      <span className={styles.title}>{title}</span>
      <form className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          validateInput();
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
                (<u onClick={() => {
                  setShowCategoryInput(!showCategoryInput)
                  setFormValues({ ...formValues, category: '' })
                }}>
                  {showCategoryInput ? 'Izvēlēties no esošajām' : 'Jauna kategorija'}</u>)
              </span>)
            }
          </span>
          {(categories && categories.length > 1 && !showCategoryInput) ?
            (<select
              value={formValues.category}
              className={styles.form_select}
              onChange={(e) => {
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
            placeholder="Saite uz bildi: http://..."
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
        {Object.values(invalidInput).some(value => showErrorMessage(value)) &&
          (<div className={styles.error_container}>
            {showErrorMessage(invalidInput.name) && <span><b>Nosaukums:</b> {invalidInput.name}</span>}
            {showErrorMessage(invalidInput.category) && <span><b>Kategorija:</b> {invalidInput.category}</span>}
            {showErrorMessage(invalidInput.imgLink) && <span><b>Bilde:</b> {invalidInput.imgLink}</span>}
            {showErrorMessage(invalidInput.content) && <span><b>Apraksts:</b> {invalidInput.content}</span>}
          </div>)
        }
        <button>Apstiprināt</button>
      </form>
      <ToastContainer />
    </div>
  )
}

