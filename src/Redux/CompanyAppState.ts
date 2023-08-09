//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from '../Models/Company';

interface CompanyState {
    companies: CompanyModel[];
    companySingle:CompanyModel;
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CompanyState = {
    companies: [],
    companySingle:{id:0,name:"",email:"",password:""}
};

//These are all possible actions
export enum ActionType {
    GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
    ADDED_COMPANY = "ADDED_COMPANY",
    UPDATED_COMPANY= "UPDATED_COMPANY",
    DELETED_COMPANY = "DELETED_COMPANY",
    CLEAR_COMPANIES = "CLEAR_COMPANIES"
}



const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        gotAllCompanyAction(state, action: PayloadAction<CompanyModel[]>) {
            state.companies = action.payload;
        },
        gotSingleCompanyAction(state, action: PayloadAction<CompanyModel>) {
            state.companySingle = action.payload;
        },
        addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
            state.companies.push(action.payload);
        },
        updatedCompanyAction(state, action: PayloadAction<CompanyModel>) {
            const idx = state.companies.findIndex(c => c.id === action.payload.id);
            state.companies[idx] = action.payload;
            console.log(state.companies[idx]);
            console.log(action.payload);
        },
        deletedCompanyAction(state, action: PayloadAction<number>) {
            state.companies = state.companies.filter((company) => company.id !== action.payload);
        },
        clearAllCompanies(state) {
            state.companies = initialState.companies;
        }

    },
});


//This is the exported tasks
export const {
    gotAllCompanyAction,
    gotSingleCompanyAction,
    addedCompanyAction,
    updatedCompanyAction,
    deletedCompanyAction,
    clearAllCompanies} = companiesSlice.actions;



//Export the reducer
export const comppaniesReducer = companiesSlice.reducer;