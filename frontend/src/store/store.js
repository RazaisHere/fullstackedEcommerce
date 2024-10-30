// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slice/productSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
    },
});

export default store;
