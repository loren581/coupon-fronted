import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../Models/Customer'; // Switched to CustomerModel

interface CustomerState {
    customers: CustomerModel[]; // Switched to CustomerModel
    customer:CustomerModel;
}

const initialState: CustomerState = { // Switched to CustomerState
    customers: [], // Switched to customers
    customer:{id:0,firstName:"",lastName:"",email:"",password:"", coupons:[]}
};

export enum ActionType {
    GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS", // Switched to GOT_ALL_CUSTOMERS
    ADDED_CUSTOMER = "ADDED_CUSTOMER", // Switched to ADDED_CUSTOMER
    UPDATED_CUSTOMER = "UPDATED_CUSTOMER", // Switched to UPDATED_CUSTOMER
    DELETED_CUSTOMER = "DELETED_CUSTOMER", // Switched to DELETED_CUSTOMER
    CLEAR_CUSTOMERS = "CLEAR_CUSTOMERS", // Switched to CLEAR_CUSTOMERS
}

const customersSlice = createSlice({
    name: "customers", // Switched to "customers"
    initialState,
    reducers: {
        gotAllCustomerAction(state, action: PayloadAction<CustomerModel[]>) { // Switched to gotAllCustomerAction
            state.customers = action.payload;
        },
        gotSingleCustomerAction(state, action: PayloadAction<CustomerModel>) { // Switched to gotAllCustomerAction
            state.customer = action.payload;
        },
        addedCustomerAction(state, action: PayloadAction<CustomerModel>) { // Switched to addedCustomerAction
            state.customers.push(action.payload);
        },
        updatedCustomerAction(state, action: PayloadAction<CustomerModel>) { // Switched to updatedCustomerAction
            const idx = state.customers.findIndex(c => c.id === action.payload.id);
            state.customers[idx] = action.payload;
            console.log(action.payload);
        },
        deletedCustomerAction(state, action: PayloadAction<number>) { // Switched to deletedCustomerAction
            state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        },
        clearAllCustomers(state) { // Switched to clearAllCustomers
            state.customers = initialState.customers;
        }
    },
});

export const {
    gotAllCustomerAction,
    gotSingleCustomerAction,
    addedCustomerAction,
    updatedCustomerAction,
    deletedCustomerAction,
    clearAllCustomers
} = customersSlice.actions;

export const customersReducer = customersSlice.reducer; // Switched to customersReducer
