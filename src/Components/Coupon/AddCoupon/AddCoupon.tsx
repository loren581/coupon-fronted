import "./AddCoupon.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { CouponModel } from '../../../Models/Coupon';
import store from "../../../Redux/Store";
import { useState } from "react";
import {  LoginResModel } from "../../../Models/Login";
import { addedCouponAction } from "../../../Redux/CouponAppState";
import { CouponModelAdd } from "../../../Models/CouponModelAdd";
function AddCoupon(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        category: zod.enum(["FOOD", "HEALTH", "VACATION","COMPUTER","SPORT"]),
        title: zod.string(),
        description: zod.string(),
        startDate: zod.string().transform((dateString, ctx) => {
          const date = new Date(dateString);
          if (!zod.date().safeParse(date).success) {
            ctx.addIssue({
              code: zod.ZodIssueCode.invalid_date,
              message: "Invalid start date",
            });
          }
          return date;
        }),        
        endDate: zod.string().transform((dateString, ctx) => {
          const date = new Date(dateString);
          if (!zod.date().safeParse(date).success) {
            ctx.addIssue({
              code: zod.ZodIssueCode.invalid_date,
              message: "Invalid end date",
            });
          }
          return date;
        }),
        amount: zod.number(),
        price: zod.number(),
        
        image: zod.string()
      });
      
    


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<CouponModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {

        return webApiService.addCoupon(data)
            .then(res => {
                notifyService.success('Added Coupon sucessfully');
                // store.dispatch(addedTaskAction(res.data));
                dispatch(addedCouponAction(res.data));
                navigate("/coupons");
            })
            .catch(err => notifyService.error(err))



    };
    return (
        <div className="AddCoupon form-look-and-feel">
            <h1>Add new Company</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

    


<select {...register("category")} name="category" id="category">
  <option value="FOOD">FOOD</option>
  <option value="HEALTH">HEALTH</option>
  <option value="VACATION">VACATION</option>
  <option value="COMPUTER">COMPUTER</option>
  <option value="SPORT">SPORT</option>
</select>

{(errors?.title) ? <span>{errors.title.message}</span> : <label htmlFor="title">Title</label>}
<input {...register("title")} name="title" type="text" placeholder="Title..." />

{(errors?.description) ? <span>{errors.description.message}</span> : <label htmlFor="description">Description</label>}
<input {...register("description")} name="description" type="text" placeholder="Description..." />

{(errors?.startDate) ? <span>{errors.startDate.message}</span> : <label htmlFor="startDate">Start Date</label>}
<input {...register("startDate")} name="startDate" type="date" />

{(errors?.endDate) ? <span>{errors.endDate.message}</span> : <label htmlFor="endDate">End Date</label>}
<input {...register("endDate")} name="endDate" type="date"  />

{(errors?.amount) ? <span>{errors.amount.message}</span> : <label htmlFor="amount">Amount</label>}
<input {...register("amount",{valueAsNumber:true})} name="amount" type="number" placeholder="Amount..." />

{(errors?.price) ? <span>{errors.price.message}</span> : <label htmlFor="price">Price</label>}
<input {...register("price",{valueAsNumber:true})} name="price" type="number" placeholder="Price..." />

{(errors?.image) ? <span>{errors.image.message}</span> : <label htmlFor="image">Image URL</label>}
<input {...register("image")} name="image" type="text" placeholder="Image URL..." />

<button disabled={!isValid || isSubmitting}>ADD</button>
            </form>
        </div>
    );
}

export default AddCoupon;

