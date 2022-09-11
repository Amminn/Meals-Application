import React from 'react'
import Favorite from './components/Favorite'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'
import {Context} from './Context'

function App() {
  const {showModal, favoriteMeal} = React.useContext(Context)
  return (
    <main>
      <Search />
      {favoriteMeal.length > 0 && <Favorite />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}

export default App