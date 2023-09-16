import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  mealTypeData: [],
  error: "",
  selectedMealType: "",
};

export const fetchMealTypes = createAsyncThunk("fetchMealTypes", () => {
  return axios
    .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => {
      return response.data;
    });
});

const mealTypeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateMealTypes: (state, action) => {
      state.selectedMealType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMealTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMealTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.mealTypeData = action.payload.meals;
      state.error = "";
    });
    builder.addCase(fetchMealTypes.rejected, (state, action) => {
      state.loading = false;
      state.mealTypeData = [];
      state.error = action.error.message;
    });
  },
});

export default mealTypeSlice.reducer;
export const { updateMealTypes } = mealTypeSlice.actions;
