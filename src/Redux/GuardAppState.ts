import { createSlice } from '@reduxjs/toolkit';


//This is the Contract
interface GuardState {
    clientType:string;
}


//This is the initialized Task Application State - initialize within empty array
const initialState: GuardState = {
    clientType:""
};

//These are all possible actions
export enum ActionType {
    LOGGED_IN_AS_ADMIN = "LOGGED_IN_AS_ADMIN",
    LOGGED_IN_AS_COMPANY = "LOGGED_IN_AS_COMPANY",
    LOGGED_IN_AS_CUSTOMER = "LOGGED_IN_AS_CUSTOMER",
    CLEAR_DATA = "CLEAR_DATA"
}


//This is tasksSlice
const guardSlice = createSlice({
    name: "guard",
    initialState,
    reducers: {
        loggedInAsAdmin(state) {
            state.clientType = "ADMINISTRATOR";
        },
        loggedInAsCompany(state) {
            state.clientType = "COMPANY";
        },
        loggedInAsCustomer(state) {
            state.clientType = "CUSTOMER";
        },
        removeAccess(state) {
            state.clientType = initialState.clientType;
        },
   
   
   
    },
});


//This is the exported tasks
export const {
    loggedInAsAdmin,
    loggedInAsCompany,
    loggedInAsCustomer,
    removeAccess,
  } = guardSlice.actions;

//Export the reducer
export const guardReducer = guardSlice.reducer;