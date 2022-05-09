import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: "",
    city: "",
    phone: "",
    website: "",
    companyName: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFieldValue: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    clearForm: (state) => {
      state.data = initialState.data;
    },
  },
});

export const selectFormValues = (state) => state.form.data;
export const { setFieldValue, clearForm } = formSlice.actions;

export default formSlice.reducer;
