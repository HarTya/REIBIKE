import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export interface AdminAuthState {
    adminAuthState: boolean;
}

const initialState: AdminAuthState = {
    adminAuthState: false,
};

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminAuthState(state, action) {
            state.adminAuthState = action.payload;
        }
    }
});

export const { setAdminAuthState } = adminAuthSlice.actions;

export const selectAdminAuthState = (state: AppState) => state.adminAuth.adminAuthState;

export default adminAuthSlice.reducer;