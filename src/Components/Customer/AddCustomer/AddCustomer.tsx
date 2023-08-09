import "./AddCustomer.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { CustomerModel } from "../../../Models/Customer";
import { addedCustomerAction } from "../../../Redux/CustomerAppState";
function AddCustomer(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        firstName: zod.string().nonempty("you must enter first name"),
        lastName: zod.string().nonempty("you must enter last name"),
        email: zod.string().email("Enter a valid email").nonempty("You must enter an email"),
        password: zod.string().nonempty("You must enter a password"),


    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<CustomerModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {

        return webApiService.addCustomer(data)
            .then(res => {
                notifyService.success('Added Customer sucessfully');
                // store.dispatch(addedTaskAction(res.data));
                dispatch(addedCustomerAction(res.data));
                navigate("/customers");
            })
            .catch(err => notifyService.error(err))



    };





    return (
        <div className="AddCustomer form-look-and-feel">
            <h1>Add new Customer</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

                {(errors?.firstName) ? <span>{errors.firstName.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} name="firstName" type="text" placeholder="FirstName..." />

                {(errors?.lastName) ? <span>{errors.lastName.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} name="lastName" type="text" placeholder="LastName..." />

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} type="text" name="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="text" placeholder="Password..." />
                <button disabled={!isValid || isSubmitting}>ADD</button>
            </form>
        </div>
    );
}

export default AddCustomer;
