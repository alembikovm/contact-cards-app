import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contactsSlice';
import formReducer from './formSlice';
import modalReducer from './modalSlice';


export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    modal: modalReducer,
    form: formReducer
  },
});
