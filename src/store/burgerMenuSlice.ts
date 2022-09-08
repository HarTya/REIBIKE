import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export interface BurgerMenuState {
    isBurgerMenuOpen: boolean
}

const initialState: BurgerMenuState = {
    isBurgerMenuOpen: false
};

export const burgerMenuSlice = createSlice({
    name: 'burgerMenu',
    initialState,
    reducers: {
        setBurgerMenuState(state, action) {
            state.isBurgerMenuOpen = action.payload;
        }
    }
});

export const { setBurgerMenuState } = burgerMenuSlice.actions;

export const selectBurgerMenuState = (state: AppState) => state.burgerMenu.isBurgerMenuOpen;

export default burgerMenuSlice.reducer;