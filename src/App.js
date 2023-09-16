import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import IngredientsView from "./features/ingredients/ingredientsView";
import MealTypeView from "./features/mealType/mealTypeView";
import MealListView from "./features/mealList/mealListView";
import { fetchMealsByType } from "./features/mealList/mealSlice";

function App() {
  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );
  const selectedMealType = useSelector(
    (state) => state.mealTypes.selectedMealType
  );
  const dispatch = useDispatch();

  const findRecipes = () => {
    console.log(selectedIngredients, selectedMealType);
    dispatch(fetchMealsByType(selectedMealType));
  };

  return (
    <div className="App">
      <div className="header-container">
        <h1>Recipe Generator</h1>
      </div>
      <div className="section-container">
        <div className="filter-section-container">
          <IngredientsView />
          <MealTypeView />
        </div>
        <button className="find-recipe-button" onClick={findRecipes}>
          Find Recipe
        </button>
        <MealListView />
      </div>
    </div>
  );
}

export default App;
