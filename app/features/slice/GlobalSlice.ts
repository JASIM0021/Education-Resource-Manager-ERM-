import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'typesafe-actions';

const GlobalSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loader: false,
    error: null,
    location: {
      district: '',
      latitude: '',
      longitude: '',
    },
    products: [
      {
        id: 1242352,
        name: 'demo1',
        price: 100,
        brand: 'jasim',
      },
    ],
  },
  reducers: {
    saveLocation: (state, action) => {
      state.location = action.payload;
    },

    saveUser: (state, action) => {
      state.user = action.payload;
    },
    registrationSuccess(state, action: any) {
      console.log('action', action);
      state.user = action.payload;
      state.error = null;
      state.loader = false;
    },
    registrationError(state, action: any) {
      console.log('action', action);
      state.user = null;
      state.error = action.payload;
      state.loader = false;
    },

    productFetchSuccess(state, action: any) {
      console.log('action', action);
      state.products = action.payload;
    },
    startLoading(state) {
      console.log('state', state);
      state.loader = true;
    },
    stopLoading(state) {
      state.loader = false;
    },
  },
});

export const {
  saveLocation,
  saveUser,
  registrationSuccess,
  registrationError,
  productFetchSuccess,
  startLoading,
  stopLoading,
} = GlobalSlice.actions;
export default GlobalSlice.reducer;
