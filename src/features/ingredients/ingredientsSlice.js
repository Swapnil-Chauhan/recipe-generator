import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  ingredientData: [],
  error: "",
  selectedIngredients: [],
};

export const fetchIngredients = createAsyncThunk("fetchIngredients", () => {
  return axios
    .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then((response) => {
      return response.data;
    });
});

const ingredientSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateIngredients: (state, action) => {
      state.selectedIngredients = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredientData = action.payload.meals;
      state.error = "";
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.ingredientData = [];
      state.error = action.error.message;
    });
  },
});

export default ingredientSlice.reducer;
export const { updateIngredients } = ingredientSlice.actions;
