import { useState, useEffect } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import IngredientFilter from './components/IngredientFilter/IngredientFilter.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Get a unique list of all ingredients from the recipes
  const allIngredients = Array.from(new Set(recipes.flatMap(recipe => recipe.ingredients))).sort();

  const filteredRecipes = orderedRecipes.filter((item) => {
    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((ingredient) =>
        item.ingredients.includes(ingredient),
      );
    return matchesSearchQuery && matchesSelectedIngredients;
  });

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  function handleIngredientToggle(ingredient) {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((ing) => ing !== ingredient)
        : [...prev, ingredient],
    );
  }

  useEffect(() => {
  }, [searchQuery, selectedIngredients])
  

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
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <IngredientFilter
          allIngredients={allIngredients}
          selectedIngredients={selectedIngredients}
          onToggle={handleIngredientToggle}
        />
        <RecipeList recipes={filteredRecipes} />
      </main>
    </div>
  );
}
