import React from 'react'
import { Context } from '../Context';

function Search() {
  const {getRandomMeal, getMealStartedWith} = React.useContext(Context)
  const [text, setText] = React.useState('')

  function handleChange(event) {
    setText(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    getMealStartedWith(text)
  }

  function invokeTheRandomFunction() {
    setText('')
    getRandomMeal()
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={handleChange} value={text} placeholder="Type favorite meal" className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button onClick={invokeTheRandomFunction} type='button' className='btn btn-hipster'>Surprise me !</button>
      </form>
    </header>
  )
}

export default Search