import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { adminAuthSlice } from './adminAuthSlice';
import { basketSlice } from './basketSlice';
import { burgerMenuSlice } from './burgerMenuSlice';
import { searchSlice } from './searchSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            [adminAuthSlice.name]: adminAuthSlice.reducer,
            [burgerMenuSlice.name]: burgerMenuSlice.reducer,
            [basketSlice.name]: basketSlice.reducer,
            [searchSlice.name]: searchSlice.reducer
        }
    })

    export type AppStore = ReturnType<typeof makeStore>;
    export type AppState = ReturnType<AppStore['getState']>;
    export type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        AppState,
        unknown,
        Action
    >;

export const wrapper = createWrapper<AppStore>(makeStore);