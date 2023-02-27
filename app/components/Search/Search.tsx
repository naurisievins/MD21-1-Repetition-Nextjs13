import styles from './Search.module.scss'
import { HeaderParams } from "types/types";
import debounce from 'utils/debounce';

export default function Header({ setRecipeSearchParams }: HeaderParams) {

  const handleInputChange = (eventValue: string) => {
    setRecipeSearchParams({
      name: eventValue,
      method: 'search',
      category: ''
    })
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
