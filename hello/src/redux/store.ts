import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {persistReducer,persistStore} from 'redux-persist'
import  storage  from 'redux-persist/lib/storage';

const persistConfig = {
    key:"root",
    version:1,
    storage,
};

const persistedReducer = persistReducer(persistConfig,authReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck:false}
    ),
});


export const persist = persistStore(store)