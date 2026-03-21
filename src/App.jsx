import { useState, useEffect } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState('')
  const filteredRecipes = orderedRecipes.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  useEffect(() => {
  }, [searchQuery])
  

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <RecipeList recipes={filteredRecipes} />
      </main>
    </div>
  )
}
