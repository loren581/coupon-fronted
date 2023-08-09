

import "./SingleCustomer.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import {  maxPriceModel } from '../../../Models/maxPrice';
import { gotSingleCustomerAction } from "../../../Redux/CustomerAppState";

function SingleCustomer(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        maxPrice: zod.number(),


    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<maxPriceModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<maxPriceModel> = (data: maxPriceModel) => {

        return webApiService.getSingleCustomer(data.maxPrice)
            .then(res => {
                notifyService.success('your results are ready');
dispatch(gotSingleCustomerAction(res.data))                
console.log(res.data);
                navigate(`/customers/${data.maxPrice}`)
            })
            .catch(err => notifyService.error(err.response.data.description))



    };





    return (
        <div className="search form-look-and-feel">
            <h1>Add new Company</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

                {(errors?.maxPrice) ? <span>{errors.maxPrice.message}</span> : <label htmlFor="maxPrice"> Id</label>}
                <input {...register("maxPrice",{valueAsNumber:true})} name="maxPrice" type="number" placeholder="Id..." />


                <button  disabled={!isValid || isSubmitting}>SEARCH</button>
            </form>
        </div>
    );
}

export default SingleCustomer;
