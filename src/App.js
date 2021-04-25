import React, {useState, useEffect} from 'react'
import RecipeList from './Components/RecipeList'
import './Components/css/app.css'
import uuidv4 from 'uuid/v4'
import RecipeEdit from './Components/RecipeEdit'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'recipelsit.recipes'

const App = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState() 
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find( recipe => recipe.id === selectedRecipeId )


  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id) ;
  }

  function handleRecipeAdd()  {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: ''}
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete (id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }

    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue} >
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>

  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain chicken',
    servings: 3,
    cookTime: '1:45',
    instructions:    '1. Put salt \n 2. Put chicken \n 3. Put ogurek',
    ingredients: [
      {
        id: 1,
        name: 'tomato',
        amount: 8,
      },
      {
        id: 2,
        name: 'apple',
        amount: 2,
      }
    ]
  },

  {
    id: 2,
    name: 'Plain pork',
    servings: 5,
    cookTime: '3:45',
    instructions: '1. Put papar /n 2. Put egg /n 3. Put butter',
    ingredients: [
      {
        id: 1,
        name: 'chicken',
        amount: 2,
      },
      {
        id: 2,
        name: 'sausage',
        amount: 5,
      }
    ]
  }
]

export default App;
