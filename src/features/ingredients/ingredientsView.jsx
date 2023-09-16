import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, updateIngredients } from "./ingredientsSlice";
import ReactSelect from "../../components/ReactSelect";

const IngredientsView = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const ingredients = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (
      ingredients &&
      ingredients.ingredientData &&
      ingredients.ingredientData.length > 0
    ) {
      let options = ingredients.ingredientData.map((ingredient) => {
        return {
          value: ingredient.strIngredient,
          label: ingredient.strIngredient,
        };
      });
      setIngredientOptions([...options]);
    }
  }, [ingredients, ingredients.ingredientData]);

  const onIngredientsChange = (value) => {
    let selectedOptions = [];
    value.map((v) => {
      selectedOptions = [...selectedOptions, v.value];
    });
    dispatch(updateIngredients(selectedOptions));
  };

  return (
    <>
      {ingredientOptions && ingredientOptions.length > 0 && (
        <>
          <div className="filter-container">
            <h2>Choose your Ingredients</h2>
            <div className="ingredientsDropdown-container">
              <ReactSelect
                options={ingredientOptions}
                placeholder="Select Ingredients"
                onChange={onIngredientsChange}
                isMulti={true}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IngredientsView;
