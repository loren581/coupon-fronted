import "./CouponListCategoryForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { gotAllCouponByCategoryAction } from "../../../Redux/CouponAppState";
import { CategoryModel } from "../../../Models/Category";
import { RootState } from "../../../Redux/Store";
function CouponListCategoryForm(): JSX.Element {
    const clientType = useSelector((state: RootState) => state.guardReducer.clientType);

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        category: zod.enum(["FOOD", "HEALTH", "VACATION","COMPUTER","SPORT"]),


    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<CategoryModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<CategoryModel> = (data: CategoryModel) => {

      if(clientType=="COMPANY"){  return webApiService.getAllCouponsByCategory(data.category)
            .then(res => {
                notifyService.success('your results are ready');
dispatch(gotAllCouponByCategoryAction(res.data))                
console.log(res.data);
                navigate("/coupons/category/list")
            })
            .catch(err => notifyService.error(err))



    }
else if(clientType=="CUSTOMER"){
    return webApiService.getAllCouponsByCategoryAsCustomer(data.category)
    .then(res => {
        notifyService.success('your results are ready');
dispatch(gotAllCouponByCategoryAction(res.data))                
console.log(res.data);
        navigate("/coupons/category/list")
    })
    .catch(err => notifyService.error(err))

}};





    return (
        <div className="search form-look-and-feel">
            <h1>Search</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               
            <select {...register("category")} name="category" id="category">
  <option value="FOOD">FOOD</option>
  <option value="HEALTH">HEALTH</option>
  <option value="VACATION">VACATION</option>
  <option value="COMPUTER">COMPUTER</option>
  <option value="SPORT">SPORT</option>
</select>



                <button  disabled={!isValid || isSubmitting}>SEARCH</button>
            </form>
        </div>
    );
}

export default CouponListCategoryForm;
