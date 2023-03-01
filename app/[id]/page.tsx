'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { Recipe, CharByIdParams } from "types/types";
import Link from "next/link";
import styles from './page.module.scss'
import Form from "app/components/Form/Form";
import { toast, ToastContainer } from "react-toastify";
import authorized from "utils/authorized";
import { useRouter } from 'next/navigation';
import passwordPrompt from "utils/passwordPrompt";
import getSessionKey from "utils/getSessionKey";

export default function CharById({ params }: CharByIdParams) {

  const id = params.id
  const [recipe, setRecipe] = useState<Recipe>()
  const [showEditForm, setShowEditForm] = useState(false)
  const router = useRouter();
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`../api/${id}`)
      .then(res => {
        setRecipe(res.data[0]);
      })
      .catch(err => {
        console.log(err);
        setError(true)
      })
  }, [id])

  const handleDelete = () => {

    const deleteRecepe = () => {
      axios.delete(`../api/${id}`, {
        data: {
          key: getSessionKey(),
        }
      })
        .then(() => {
          setTimeout(() => router.push('/'), 1500);
          toast.success('Recepte izdzēsta')
        })
        .catch(err => {
          console.log(err);
        })
    }

    if (authorized()) {
      deleteRecepe();
    } else {
      passwordPrompt()
    }

  }

  if (error) {
    return <h2 className="loading-error">Error 404! No data found!</h2>
  }

  return (
    <div className={styles.container}>
      {recipe && (
        <div className={styles.recipe_full}>
          <div className={styles.top_menu}>
            <Link href="" legacyBehavior>
              <a>&#8656; Atpakaļ</a>
            </Link>
            <div className={styles.top_menu_btn_container}>
              <button onClick={() => {
                const acceptDelete = confirm('Vai tiešām vēlaties izdzēst recepti?')
                acceptDelete && handleDelete()
              }}>&#10005; Izdzēst</button>
              <button onClick={() => setShowEditForm(!showEditForm)}>
                {showEditForm ?
                  'Aizvērt' :
                  <>&#9998; Labot</>
                }
              </button>
            </div>
          </div>
          {(showEditForm && recipe) ? <Form
            recipe={recipe}
            setShowEditForm={setShowEditForm}
            title={"Labot recepti"}
            setRecipe={setRecipe} /> :
            (<>
              <div className={styles.recipe_image}>
                <img src={recipe.imgLink} alt={recipe.name} />
              </div>
              <span className={styles.recipe_name}>{recipe.name}</span>
              <pre className={styles.recipe_content}>{recipe.content}</pre>
            </>)
          }
        </div>
      )}
      <ToastContainer />
    </div>
  );
}