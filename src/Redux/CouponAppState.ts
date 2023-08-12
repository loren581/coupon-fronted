//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../Models/Coupon'; // Updated import

interface CouponState { // Updated interface name
    coupons: CouponModel[]; // Updated array name
    couponsAll: CouponModel[]; // Updated array name
    couponsByMaxPrice: CouponModel[];
    couponsByCategory: CouponModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CouponState = { // Updated state name
    coupons: [], // Updated array name
    couponsAll: [], // Updated array name
    couponsByMaxPrice:[],
    couponsByCategory:[],
};

//These are all possible actions
export enum ActionType {
    GOT_ALL_COUPONS = "GOT_ALL_COUPONS", // Updated enum value
    ADDED_COUPON = "ADDED_COUPON", // Updated enum value
    UPDATED_COUPON = "UPDATED_COUPON", // Updated enum value
    DELETED_COUPON = "DELETED_COUPON", // Updated enum value
    CLEAR_COUPONS = "CLEAR_COUPONS" // Updated enum value
}

const couponsSlice = createSlice({
    name: "coupons", // Updated name
    initialState,
    reducers: {
        gotAllCouponAction(state, action: PayloadAction<CouponModel[]>) { // Updated action name
            state.coupons = action.payload; // Updated array name
        },
        gotAllCouponAllAction(state, action: PayloadAction<CouponModel[]>) { // Updated action name
            state.couponsAll = action.payload; // Updated array name
        },
        gotAllCouponByMaxPriceAction(state, action: PayloadAction<CouponModel[]>) { // Updated action name
            state.couponsByMaxPrice = action.payload; // Updated array name
        },
        gotAllCouponByCategoryAction(state, action: PayloadAction<CouponModel[]>) { // Updated action name
            state.couponsByCategory = action.payload; // Updated array name
        },
        addedCouponAction(state, action: PayloadAction<CouponModel>) { // Updated action name
            state.coupons.push(action.payload); // Updated array name
        },
        updatedCouponAction(state, action: PayloadAction<CouponModel>) { // Updated action name
            const idx = state.coupons.findIndex(c => c.id === action.payload.id);
            state.coupons[idx] = action.payload;
            console.log(action.payload);
        },
        deletedCouponAction(state, action: PayloadAction<number>) { // Updated action name
            state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
        },
        clearAllCoupons(state) { // Updated action name
            state.coupons = initialState.coupons; // Updated array name
        }
    },
});

//This is the exported tasks
export const {
    gotAllCouponAction,
    gotAllCouponAllAction,
    gotAllCouponByMaxPriceAction,
    gotAllCouponByCategoryAction,
    addedCouponAction,
    updatedCouponAction,
    deletedCouponAction,
    clearAllCoupons
} = couponsSlice.actions;

//Export the reducer
export const couponsReducer = couponsSlice.reducer; // Updated reducer name
