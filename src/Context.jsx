import React from 'react'
const Context = React.createContext()

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

function ContextProvider({children}) {

  const [meals, setMeals] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [selectedMeal, setSelectedMeal] = React.useState(null)
  const [favoriteMeal, setFavoriteMeal] = React.useState(getFavoritesFromLocalStorage())
  
  const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'
  const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const mealsStartedWithLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f='

  const [searchTerm, setSearchTerm] = React.useState(allMealsUrl)
  
  const fetchData = async(url) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if(data.meals.length >= 1) {
        setMeals(data.meals)
      }
    } catch(error) {
      setMeals([])
      // console.log(error)
    }
    return setLoading(false)
  }

  function getRandomMeal() {
    setSearchTerm(randomMealUrl)
    fetchData(searchTerm)
  }

  function getMealStartedWith(letter) {
    setSearchTerm(letter)    
    if(letter.length === 0) {
      fetchData(`${allMealsUrl}`)
    } else if(letter.length === 1) {
      fetchData(`${mealsStartedWithLetter}${letter}`)
    } else if (letter.length >= 1) {
      fetchData(`${allMealsUrl}${letter}`)
    }
  }

  function selectMeal(idMeal) {
    function changeState() {
      setSelectedMeal(meal)
      setShowModal(true)
    }
    let meal
    meal = meals.find(meal => meal.idMeal === idMeal)
    if (meal === undefined) {
      return (meal = favoriteMeal.find(meal => meal.idMeal === idMeal),
       changeState()
      )
    }
    changeState()
  }

  function closeModal(event) {
    // 👇 if this return true means we did click on the parent not the child
    if (event.target === event.currentTarget) {
      setShowModal(false)
    }
  }

  function addToFavorite(idMeal) {
    let meal
    meal = meals.find(meal => meal.idMeal === idMeal)
    let alreadyInFavorite = favoriteMeal.find(item => item.idMeal === idMeal)
    if (!alreadyInFavorite) {
      const updatedFavorites = [...favoriteMeal, meal]       
      setFavoriteMeal(updatedFavorites)
      localStorage.setItem('favoriteMeal', JSON.stringify(updatedFavorites))
    } else {
      alert("Your Meal is Already in the Favorite Section!");
    }
  }

  function removeFavorite(idMeal) {
    if(favoriteMeal.length >= 1) {
      let newArray = favoriteMeal.filter(item => item.idMeal !== idMeal)
      setFavoriteMeal(newArray)
      localStorage.setItem('favoriteMeal', JSON.stringify(newArray))
    } else {
      alert('Favorite Section is Already Empty!')
    }
  }

  React.useEffect(() => { 
    fetchData(searchTerm)
  }, [searchTerm])

  return (
    <Context.Provider value={{meals, loading, getRandomMeal, getMealStartedWith, showModal, selectMeal, selectedMeal, closeModal, favoriteMeal, addToFavorite, removeFavorite}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}