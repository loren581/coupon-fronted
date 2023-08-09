import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCustomer.css"; // Update with your CSS path
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyModel } from "../../../Models/Company"; // Update with the correct CompanyModel import
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { updatedCompanyAction } from "../../../Redux/CompanyAppState"; // Update with the correct action import
import store from "../../../Redux/Store";
import { CustomerModel } from "../../../Models/Customer";
import { updatedCustomerAction } from "../../../Redux/CustomerAppState";

function UpdateCustomer(): JSX.Element {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    
    const [obj] = useState<CustomerModel>(store.getState().customersReducer.customers.filter(c => c.id === id)[0])
    console.log(obj)

    const defaultValuesObj = { ...obj }; // Spread Operator

    const schema = zod.object({
        id:zod.number(),
        firstName: zod.string().nonempty("You must enter a first name"),
        lastName: zod.string().nonempty("You must enter a last name"),
        email: zod.string().email("Enter a valid email").nonempty("You must enter an email"),
        password: zod.string().nonempty("You must enter a password"),
        // Add more validations as needed
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
        return webApiService.updateCustomer(id, data) // Update with the correct method
            .then(res => {
                notifyService.success(`Updated customer #${id} successfully`);
                dispatch(updatedCustomerAction(data)); // Update with the correct action
                navigate("/customers");
            })
            .catch(err => notifyService.error(err));
    };

    return (
        <div className="UpdateCustomer"> {/* Update with the correct class name */}
            <h1>Update Existing Company</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Id</label>
                <input {...register("id")} name="id" type="number" value={obj.id} disabled={true} />

                
                {(errors?.firstName) ? <span>{errors.firstName.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} name="firstName" type="text" placeholder="FirstName..." />

                {(errors?.lastName) ? <span>{errors.lastName.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} name="lastName" type="text" placeholder="LastName..." />

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} name="email" type="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="password" placeholder="Password..." />

                {/* Add more input fields for other properties as needed */}

                <button disabled={!isValid || isSubmitting}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
