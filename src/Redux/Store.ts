// This is Store.ts file
import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './TaskAppState';
import { userReducer } from './UserAppState';
import { guardReducer } from './GuardAppState';
import { comppaniesReducer } from './CompanyAppState';
import { customersReducer } from './CustomerAppState';
import { couponsReducer } from './CouponAppState';

// This is rootReducer
const rootReducer = {
    tasksReducer: tasksReducer,
    userReducer: userReducer,
    guardReducer: guardReducer,
    companiesReducer: comppaniesReducer,
    customersReducer: customersReducer,
    couponsReducer: couponsReducer,
    // add more reducers here if needed
};


// This is store object
const store = configureStore({
    reducer: rootReducer,
});

// Export root Application State
export type RootState = ReturnType<typeof store.getState>;

// Export store object
export default store;