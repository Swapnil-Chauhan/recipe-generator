import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MealListView = (props) => {
  const meals = useSelector((state) => state.meals);

  const getMealThumbNails = () => {
    return meals.mealsByType.map((meal) => (
      <>
        <div className="meal-container">
          <img
            className="meal-image"
            src={meal.strMealThumb}
            alt="no image"
          ></img>
          <div className="meal-name">{meal.strMeal}</div>
        </div>
      </>
    ));
  };

  return (
    <>
      {meals.showList ? (
        <>
          <div className="seperator"></div>
          {console.log(meals.mealsByType)}
          <div className="meal-list-container">{getMealThumbNails()}</div>
        </>
      ) : null}
    </>
  );
};

export default MealListView;
