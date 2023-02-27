import styles from './Search.module.scss'
import { SearchParams } from "types/types";
import debounce from 'utils/debounce';

export default function Search({ setRecipeSearchParams, setSearchLength }: SearchParams) {

  const handleInputChange = (eventValue: string) => {
    setRecipeSearchParams({
      name: eventValue,
      method: 'search',
      category: ''
    })
    setSearchLength(eventValue.length)
  }

  const debouncedHandleInputChange = debounce(
    (eventValue: string) => handleInputChange(eventValue), 500
  );

  return (
    <label className={styles.search_label}>
      <span className={styles.search_title}>Meklēt: </span>
      <input type='text'
        placeholder='Receptes nosaukums...'
        onChange={(e) => debouncedHandleInputChange(e.target.value)}
      />
    </label>
  )
}
