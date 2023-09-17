import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mTypeLoading: true,
  iTypeLoading: true,
  mDetailsLoading: true,
  mealsByType: [],
  mealsByIngredients: [],
  mealDetails: [],
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

export const fetchMealsByIngredients = createAsyncThunk(
  "fetchMealsByIngredients",
  (ingredientsToQuery) => {
    return axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${ingredientsToQuery}`
      )
      .then((response) => {
        return response.data;
      });
  }
);

export const fetchMealDetails = createAsyncThunk(
  "fetchMealDetails",
  (mealId) => {
    return axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        return response.data;
      });
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    showListPage: (state) => {
      state.mDetailsLoading = true;
      state.iTypeLoading = true;
      state.mTypeLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMealsByType.pending, (state) => {
      state.mTypeLoading = true;
    });
    builder.addCase(fetchMealsByType.fulfilled, (state, action) => {
      state.mTypeLoading = false;
      state.mealsByType = action.payload.meals;
    });
    builder.addCase(fetchMealsByIngredients.pending, (state) => {
      state.iTypeLoading = true;
    });
    builder.addCase(fetchMealsByIngredients.fulfilled, (state, action) => {
      state.iTypeLoading = false;
      state.mealsByIngredients = action.payload.meals;
    });
    builder.addCase(fetchMealDetails.pending, (state) => {
      state.mDetailsLoading = true;
    });
    builder.addCase(fetchMealDetails.fulfilled, (state, action) => {
      state.mDetailsLoading = false;
      state.mealDetails = action.payload.meals;
    });
  },
});

export default mealSlice.reducer;
export const { showListPage } = mealSlice.actions;
