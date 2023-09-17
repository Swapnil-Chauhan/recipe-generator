import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMealDetails,
  fetchMealsByIngredients,
  selectMeal,
} from "./mealSlice";

const MealDetailsView = (props) => {
  const [showMeal, setShowMeals] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const mealDetails = useSelector((state) => state.meals.mealDetails);
  const mealByIngredients = useSelector(
    (state) => state.meals.mealsByIngredients
  );
  const dispatch = useDispatch();

  const getAllIngredients = () => {
    let ingredientDetails = [];
    Object.keys(mealDetails[0]).map((k) => {
      if (k.includes("strIngredient")) {
        if (mealDetails[0][k] !== "")
          ingredientDetails = [
            ...ingredientDetails,
            {
              name: mealDetails[0][k],
              measure:
                mealDetails[0]["strMeasure" + k.replace("strIngredient", "")],
            },
          ];
      }
    });
    return ingredientDetails.map((d) => (
      <>
        <div
          className={`${
            ingredientDetails.length > 10
              ? "ingredient-container-more"
              : "ingredient-container-less"
          } ingredients-details`}
        >
          <img
            className="ingredients-image"
            src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
              d.name
            )}.png`}
          />
          <div className="measure-text" onClick={() => onMeasureClick(d.name)}>
            {d.measure}
          </div>
        </div>
      </>
    ));
  };

  const getInstructionSteps = () => {
    return mealDetails[0].strInstructions.split(".").map(
      (instruction, index) =>
        instruction !== "" && (
          <>
            <div>
              <span>
                {index + 1}. &emsp; {instruction}
              </span>
            </div>
          </>
        )
    );
  };

  const onMeasureClick = (name) => {
    setShowMeals(true);
    setIngredient(name);
    dispatch(fetchMealsByIngredients(`i=${name}`));
  };

  const showMealsByIngredients = () => {
    return mealByIngredients.length > 0 ? (
      mealByIngredients.map((m) => (
        <>
          <div className="mealbyingredient-image-container">
            <img className="meal-image" src={m.strMealThumb} alt="no-image" />
            <div
              className="meal-name"
              style={{ width: "80%" }}
              onClick={() => mealSelectedByIngredient(m.idMeal)}
            >
              {m.strMeal}
            </div>
          </div>
        </>
      ))
    ) : (
      <div>No Meals with this Ingredient</div>
    );
  };

  const mealSelectedByIngredient = (mealId) => {
    setShowMeals(false);
    setIngredient("");
    dispatch(fetchMealDetails(mealId));
  };

  return (
    <>
      {showMeal ? (
        <>
          <h2>Meals that can be prepared using {ingredient}</h2>
          <br />
          <div className="mealbyingredient-container">
            {showMealsByIngredients()}
          </div>
        </>
      ) : (
        <>
          <div className="meal-image-container">
            <h2>{mealDetails[0].strMeal}</h2>
            <img
              className="meal-image-details"
              src={mealDetails[0].strMealThumb}
              alt="no-image"
            />
            <a href={mealDetails[0].strYoutube} target="_blank">
              See Recipe on You Tube
            </a>
          </div>
          <h2 className="ingredients-heading">Ingredients</h2>
          <div className="ingredients-instructions-container">
            <div className="ingredients-container">{getAllIngredients()}</div>
            <div>
              <h2>Instructions</h2>
              {getInstructionSteps()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MealDetailsView;
