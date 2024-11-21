// src/store/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

const initialState = {
    currentLanguage: localStorage.getItem('currentLanguage') || 'en', // Yerel depolamadan dil al
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
            localStorage.setItem('currentLanguage', action.payload);
            i18n.changeLanguage(action.payload);
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export const selectCurrentLanguage = (state) => state.language.currentLanguage;

export default languageSlice.reducer;
