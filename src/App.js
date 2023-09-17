import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import IngredientsView from "./features/ingredients/ingredientsView";
import MealTypeView from "./features/mealType/mealTypeView";
import MealListView from "./features/meals/mealListView";
import {
  fetchMealsByIngredients,
  fetchMealsByType,
  showListPage,
} from "./features/meals/mealSlice";
import MealDetailsView from "./features/meals/mealDetailsView";

function App() {
  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );
  const selectedMealType = useSelector(
    (state) => state.mealTypes.selectedMealType
  );

  const mealDetailsLoading = useSelector(
    (state) => state.meals.mDetailsLoading
  );
  const dispatch = useDispatch();

  const findRecipes = () => {
    if (selectedIngredients.length > 0 && selectedMealType !== "") {
      let ingredientsToQuery = "";
      selectedIngredients.map((i) => (ingredientsToQuery += `i=${i}&`));
      dispatch(fetchMealsByType(selectedMealType));
      dispatch(fetchMealsByIngredients(ingredientsToQuery));
    }
  };

  const homeButtonClick = () => {
    dispatch(showListPage());
  };

  return (
    <div className="App">
      <div className="header-container">
        <h1>Recipe Generator</h1>
        <button className="home-button" onClick={homeButtonClick}>
          Home
        </button>
      </div>
      {!mealDetailsLoading ? (
        <MealDetailsView />
      ) : (
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
      )}
    </div>
  );
}

export default App;
