import styles from './Filter.module.scss';
import { v4 as uuid } from 'uuid';
import { FilterProps } from 'types/types';

export default function Filter({ categories, setRecipeSearchParams }: FilterProps) {

  return (
    <>
      {categories.length > 0 && (
        <div className={styles.container}>
          <button key={uuid()}
            type="button"
            onClick={() => {
              setRecipeSearchParams({ name: '', method: 'search', category: '' })
            }}
          >
            Visas ({categories.length})
          </button>
          {categories.map(category => (
            <button key={uuid()}
              type="button"
              onClick={() => {
                setRecipeSearchParams({ name: '', method: 'filter', category })
              }}
            >
              {category}
            </button>
          ))}
        </div>)
      }
    </>
  )
}
