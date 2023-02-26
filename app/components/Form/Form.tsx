import styles from './Form.module.scss'
import { useState } from 'react'
import { Recipe } from 'types/types'

type FormProps = {
  recipe: Recipe
}

export default function Form({ recipe }: FormProps) {

  const [formValues, setFormValues] = useState(recipe)

  console.log(formValues)

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <label className={styles.form_label}>
          <span>Nosaukums</span>
          <input type="text"
            placeholder="Nosaukums"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}

          />
        </label>

        <label className={styles.form_label}>
          Bilde
          <input type="text"
            placeholder="Saite uz bildi"
            value={formValues.imgLink}
            onChange={(e) => setFormValues({ ...formValues, imgLink: e.target.value })}
          />
        </label>

        <label className={styles.form_label}>
          Receptes apraksts
          <textarea placeholder="Receptes apraksts..."
            value={formValues.content}
            onChange={(e) => setFormValues({ ...formValues, content: e.target.value })}
          />
        </label>

        <button type="button">Apstiprināt</button>
      </form>
    </div>
  )
}
