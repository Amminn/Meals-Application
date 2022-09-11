import React from 'react'
import {Context} from '../Context'

function Favorite() {
  const {favoriteMeal, selectMeal, removeFavorite} = React.useContext(Context)

  const renderFavoriteMeals = favoriteMeal.map(item => {
    const {idMeal, strMeal: title, strMealThumb: img} = item
    return (
      <div key={idMeal} id={idMeal} className="favorite-item">
        <img className='favorites-img' src={img} alt={`${title} image`} onClick={() => selectMeal(idMeal)} />
        <p className="remove-btn" onClick={() => removeFavorite(idMeal)}>remove</p>
      </div>
    )
  }) 
  return (
    <section className='favorites'>
      <div className="favorites-content">
          <h2>Favorites</h2>
        <div className="favorites-container">
          {renderFavoriteMeals}
        </div>
      </div>
    </section>
  )
}

export default Favorite