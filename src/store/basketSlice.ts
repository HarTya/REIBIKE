import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export interface BasketState {
    isBasketOpen: boolean;
    notificationCount: number;
    basketProducts: Array<any>;
}

const initialState: BasketState = {
    isBasketOpen: false,
    notificationCount: 0,
    basketProducts: []
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketState(state, action) {
            state.isBasketOpen = action.payload;
        },
        setNotificationCount(state, action) {
            state.notificationCount = action.payload;
        },
        setBasketProducts(state, action) {
            state.basketProducts = action.payload;
        }
    }
});

export const { setBasketState, setNotificationCount, setBasketProducts } = basketSlice.actions;

export const selectBasketState = (state: AppState) => state.basket.isBasketOpen;

export const selectBasketNotificationCount = (state: AppState) => state.basket.notificationCount;

export const selectBasketProducts = (state: AppState) => state.basket.basketProducts;

export default basketSlice.reducer;