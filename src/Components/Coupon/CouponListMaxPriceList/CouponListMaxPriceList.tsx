import "./CouponListMaxPriceList.css";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import store from "../../../Redux/Store";
import { CouponModel } from "../../../Models/Coupon";
import { gotAllCouponAction } from "../../../Redux/CouponAppState";
import CouponCard from "../CouponCard/CouponCard";

function CouponListMaxPriceList(): JSX.Element {

        // State = React Mechanism for managing data in component
        const[ coupons] = useState<CouponModel[]>(store.getState().couponsReducer.couponsByMaxPrice);


        // Effect = very very very very long operation...
    
            
    
            
        // setCompanies (useSelector((state: RootState) => state.companiesReducer.companies));


    
    return (
        <div className="CouponList">
			            <h1>Coupon List by max price</h1>




{
    (coupons.length !== 0) ?

        coupons.map((c, idx) => <CouponCard key={`coupon-card-${idx}`} coupon={c} />) :
        <EmptyView
            title={"No Items Found"}
            description={"there are no coupons available right now"} />
}

        </div>
    );
}




export default CouponListMaxPriceList;
