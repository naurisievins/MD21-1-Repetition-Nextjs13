import './styles.css'

export default function HomePage() {

  return (

    <div className='wrapper'>
      <h2 className='title'>Probably the best recipes you will ever find</h2>
      <div className='container container--home'>
        <p className='content'>Welcome to recipe page, where you can find a collection of recipes.
          This page is built using Next.js and MongoDB Atlas.</p>
      </div>
    </div>

  );
}