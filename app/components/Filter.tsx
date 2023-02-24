import styles from './Filter.module.scss';
import { v4 as uuid } from 'uuid';
import { FilterProps } from 'types/types';

export default function Filter({ categories }: FilterProps) {

  return (
    <div className={styles.container}>
      {categories.map(category => (
        <button key={uuid()}>{category}</button>
      ))}
    </div>
  )
}
