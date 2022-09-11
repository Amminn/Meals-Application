import React from 'react'
import {Context} from '../Context'

function Modal() {
  const {selectedMeal, closeModal} = React.useContext(Context)

  const {idMeal, strMeal: title, strMealThumb: image, strInstructions: instructions, strSource: source, strYoutube: youtube} = selectedMeal
  return (
    <aside key={idMeal} className='modal-overlay' onClick={closeModal}>
      <div className="modal-container">
        <img className='modal-img' src={image} alt={title} />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking instructions:</p>
          <p>{instructions}</p>
          <a href={source} target="_blank">Original Source</a>
          <a className='close-btn' onClick={closeModal}>Close</a>
        </div>
      </div>
    </aside>
  )
}

export default Modal