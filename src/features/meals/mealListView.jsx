import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMealDetails } from "./mealSlice";

const MealListView = () => {
  const meals = useSelector((state) => state.meals);
  const [possibleRecipes, setPossibleRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (meals && (meals.mealsByType || meals.mealsByIngredients)) {
      let recipes = meals.mealsByType.filter((mType) =>
        meals.mealsByIngredients.some((mIng) => mIng.idMeal === mType.idMeal)
      );
      setPossibleRecipes([...recipes]);
    }
  }, [meals, meals.mealsByType, meals.mealsByIngredients]);

  const getMealThumbNails = () => {
    return possibleRecipes.map((meal, index) => (
      <>
        <div className="meal-container" key={`${meal.idMeal}_${index}`}>
          <img
            className="meal-image"
            src={meal.strMealThumb}
            alt="no image"
          ></img>
          <div
            className="meal-name"
            onClick={() => onMealSelected(meal.idMeal)}
          >
            {meal.strMeal}
          </div>
        </div>
      </>
    ));
  };

  const onMealSelected = (mealId) => {
    dispatch(fetchMealDetails(mealId));
  };

  return (
    <>
      {meals.iTypeLoading ||
      meals.mTypeLoading ? null : possibleRecipes.length > 0 ? (
        <>
          <div className="seperator"></div>
          <div className="meal-list-container">{getMealThumbNails()}</div>
        </>
      ) : (
        <div className="no-meals-found">No Meals Found</div>
      )}
    </>
  );
};

export default MealListView;
