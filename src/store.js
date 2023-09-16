import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./features/ingredients/ingredientsSlice";
import mealTypeReducer from "./features/mealType/mealTypeSlice";
import mealReducer from "./features/mealList/mealSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    mealTypes: mealTypeReducer,
    meals: mealReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
