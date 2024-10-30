
import { createSlice } from '@reduxjs/toolkit';
import { products } from '../assets/frontend_assets/assets';

const initialState = {
    products: products,
    currency: "$",
    delivery_fee: 100,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
});

export const selectProducts = (state) => state.products.products;
export const selectCurrency = (state) => state.products.currency;
export const selectDeliveryFee = (state) => state.products.delivery_fee;

export default productSlice.reducer;
