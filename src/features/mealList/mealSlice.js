import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  showList: false,
  mealsByType: [],
  mealsByIngredients: [],
  error: "",
};

export const fetchMealsByType = createAsyncThunk(
  "fetchMealsByType",
  (mealType) => {
    return axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`)
      .then((response) => {
        return response.data;
      });
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMealsByType.pending, (state) => {
      state.showList = false;
    });
    builder.addCase(fetchMealsByType.fulfilled, (state, action) => {
      state.showList = true;
      state.mealsByType = action.payload.meals;
    });
    builder.addCase(fetchMealsByType.rejected, (state, action) => {
      state.showList = false;
      state.mealsByType = [];
      state.error = action.error.message;
    });
  },
});

export default mealSlice.reducer;
