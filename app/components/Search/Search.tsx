import { Dispatch, SetStateAction } from "react"
import { RecipeSearchParams } from "types/types"
import styles from './Search.module.scss'

type HeaderParams = {
  setRecipeSearchParams: Dispatch<SetStateAction<RecipeSearchParams>>
}

export default function Header({ setRecipeSearchParams }: HeaderParams) {
  return (
    <label className={styles.search_label}>
      <span className={styles.search_title}>Meklēt recepti:</span>
      <input type='text'
        placeholder='Receptes nosaukums...'
        onChange={e => setRecipeSearchParams({ name: e.target.value, method: 'search', category: '' })}
      />
    </label>
  )
}
