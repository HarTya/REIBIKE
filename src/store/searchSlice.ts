import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export interface SearchState {
    isSearchOpen: boolean;
}

const initialState: SearchState = {
    isSearchOpen: false
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchState(state, action) {
            state.isSearchOpen = action.payload;
        }
    }
});

export const { setSearchState } = searchSlice.actions;

export const selectSearchState = (state: AppState) => state.search.isSearchOpen;

export default searchSlice.reducer;