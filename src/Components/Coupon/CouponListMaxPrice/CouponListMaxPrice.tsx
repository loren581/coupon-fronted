import "./CouponListMaxPrice.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { CompanyModel } from "../../../Models/Company";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import { CouponModel } from '../../../Models/Coupon';
import { CompanyModelAdd } from "../../../Models/CompanyAdd";
import {  maxPriceModel } from '../../../Models/maxPrice';
import CouponCard from "../CouponCard/CouponCard";
import { gotAllCouponByMaxPriceAction } from "../../../Redux/CouponAppState";
import { RootState } from "../../../Redux/Store";
function CouponListMaxPrice(): JSX.Element {
    const clientType = useSelector((state: RootState) => state.guardReducer.clientType);


    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        maxPrice: zod.number(),


    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<maxPriceModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<maxPriceModel> = (data: maxPriceModel) => {
if(clientType==="COMPANY"){
        return webApiService.getAllCouponsByMaxPrice(data.maxPrice)
            .then(res => {
                notifyService.success('your results are ready');
dispatch(gotAllCouponByMaxPriceAction(res.data))                
console.log(res.data);
                navigate("/coupons/maxPrice/list")
            })
            .catch(err => notifyService.error(err))



    }
    else if(clientType==="CUSTOMER"){
        return webApiService.getAllCouponsByMaxPriceAsCustomer(data.maxPrice)
            .then(res => {
                notifyService.success('your results are ready');
dispatch(gotAllCouponByMaxPriceAction(res.data))                
console.log(res.data);
                navigate("/coupons/maxPrice/list")
            })
            .catch(err => notifyService.error(err))



    }};
    





    return (
        <div className="search form-look-and-feel">
            <h1>Search</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

                {(errors?.maxPrice) ? <span>{errors.maxPrice.message}</span> : <label htmlFor="maxPrice">Max price</label>}
                <input {...register("maxPrice",{valueAsNumber:true})} name="maxPrice" type="number" placeholder="Max Price..." />


                <button  disabled={!isValid || isSubmitting}>SEARCH</button>
            </form>
        </div>
    );
}

export default CouponListMaxPrice;
