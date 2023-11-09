import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from './features/userDetailSlice'
import productSnippetsReducer from "./features/productSnippetsSlice"
import totalRevenueReducer from "./features/totalRevenueSlice"
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        userDetails: userDetailsReducer,
        productSnippets: productSnippetsReducer,
        totalRevenue: totalRevenueReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatc = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;