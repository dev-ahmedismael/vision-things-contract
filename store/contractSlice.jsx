import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInformation: {
    name: "",
    phone: "",
    email: "",
    company_type: "شركة تضامن",
    commercial_number: "",
    tax_number: "",
    address: "",
    city: "جدة",
    building_number: "",
    street_name: "",
    second_number: "",
    district: "",
    zip_code: "",
  },
  productDetails: {
    indoor_cameras: 1,
    outdoor_cameras: 1,
    storage_device: "NVR",
    period_of_record: 1,
    show_screens: 1,
    camera_type: "EZVIZ",
  },

  totalPrice: 0,
  discount: 0,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    savePersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
    saveProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    calcTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    applyDiscount: (state, action) => {
      state.totalPrice = state.totalPrice - state.totalPrice * action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const {
  savePersonalInformation,
  saveProductDetails,
  savePaymentDetails,
  calcTotalPrice,
  applyDiscount,
  setDiscount,
} = contractSlice.actions;

export default contractSlice.reducer;
