import React from 'react'
import {Context} from '../Context'
import {BsHeartFill} from 'react-icons/bs'
import {BsHeart} from 'react-icons/bs'

function Meals() {
  const {meals, loading, error, selectMeal, addToFavorite, favoriteMeal} = React.useContext(Context)

  function checkIfFavoriteMeal(idMeal) {
    let result = favoriteMeal.some(item => item.idMeal === idMeal)
    if(result)  {
      return <BsHeartFill />
    } else {
      return <BsHeart />
    }
  }

  const mealsRender = meals.map(item => {
    const {idMeal, strMeal: title, strMealThumb: image} = item
    return (
      <article key={idMeal} className='single-meal'>
        <img className='img' src={image} alt={`${title}'s image`} onClick={() => selectMeal(idMeal)} />
        <footer>
          <h5>{title}</h5>
            <button className='like-btn'  onClick={() => addToFavorite(idMeal)}>{checkIfFavoriteMeal(idMeal)}</button>
        </footer>
      </article>
    )
  })

  return (
    <section className='section-center'>
      {(error) ? (<h4>The Meal you are Looking For is Not Found!</h4>) :
       loading ? (<h4>Loading...</h4>) : mealsRender}
    </section>
  )
}

export default Meals