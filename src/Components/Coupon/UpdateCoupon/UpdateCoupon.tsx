import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCoupon.css"; // Update with your CSS path
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import store from "../../../Redux/Store";
import { CouponModelAdd } from "../../../Models/CouponModelAdd";
import { updatedCouponAction } from "../../../Redux/CouponAppState";
import { CouponModel } from "../../../Models/Coupon";

function UpdateCoupon(): JSX.Element {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    
    const [obj] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(c => c.id === id)[0])
    console.log(obj)

    const defaultValuesObj = { ...obj }; // Spread Operator

    const schema = zod.object({
        id:zod.number(),
        category: zod.enum(["FOOD", "HEALTH", "VACATION","COMPUTER","SPORT"]),
        title: zod.string().nonempty("YOU MUST ENTER TITLE"),
        description: zod.string().nonempty("YOU MUST ENTER DESCRIPTION"),
        startDate: zod.string().transform((dateString, ctx) => {
            const date = new Date(dateString);
            if (!zod.date().safeParse(date).success) {
                ctx.addIssue({
                    code: zod.ZodIssueCode.invalid_date,
                })
            }
            return date;
        }),
        endDate: zod.string().transform((dateString, ctx) => {
            const date = new Date(dateString);
            if (!zod.date().safeParse(date).success) {
                ctx.addIssue({
                    code: zod.ZodIssueCode.invalid_date,
                })
            }
            return date;
        }),
        amount: zod.number(),
        price: zod.number(),
        
        image: zod.string().nonempty("YOU MUST ENTER IMAGE")
      });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
        return webApiService.updateCoupon(id, data) // Update with the correct method
            .then(res => {
                console.log(data);
                console.log(res.data);
                notifyService.success(`Updated coupon #${id} successfully`);
                dispatch(updatedCouponAction(res.data)); 
                
                // Update with the correct action
                navigate("/coupons");
            })
            .catch(err => notifyService.error(err));
    };

    return (
        <div className="UpdateCoupon"> {/* Update with the correct class name */}
            <h1>Update Existing Coupon</h1>
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

    
            <label htmlFor="id">Id</label>
            <input {...register("id")} name="id" type="number" value={obj.id} disabled={true} />

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
<input {...register("price",{valueAsNumber:true})} step={0.01} name="price" type="number" placeholder="Price..." />

{(errors?.image) ? <span>{errors.image.message}</span> : <label htmlFor="image">Image URL</label>}
<input {...register("image")} name="image" type="text" placeholder="Image URL..." />


                <button disabled={!isValid || isSubmitting}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
