import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCompany.css"; // Update with your CSS path
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyModel } from "../../../Models/Company"; // Update with the correct CompanyModel import
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { updatedCompanyAction } from "../../../Redux/CompanyAppState"; // Update with the correct action import
import store from "../../../Redux/Store";

function UpdateCompany(): JSX.Element {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    
    const [obj] = useState<CompanyModel>(store.getState().companiesReducer.companies.filter(t => t.id === id)[0])
    console.log(obj)

    const defaultValuesObj = { ...obj }; // Spread Operator

    const schema = zod.object({
        id:zod.number(),
        name: zod.string().nonempty("You must enter a name"),
        email: zod.string().email("Enter a valid email").nonempty("You must enter an email"),
        password: zod.string().nonempty("You must enter a password"),
        // Add more validations as needed
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
        return webApiService.updateCompany(id, data) // Update with the correct method
            .then(res => {
                notifyService.success(`Updated company #${id} successfully`);
                dispatch(updatedCompanyAction(data)); // Update with the correct action
                navigate("/companies");
            })
            .catch(err => notifyService.error(err));
    };

    return (
        <div className="UpdateCompany"> {/* Update with the correct class name */}
            <h1>Update Existing Company</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Id</label>
                <input {...register("id")} name="id" type="number" value={obj.id} disabled={true} />
                <input {...register("name")} name="name" type="text" value={obj.name} disabled={true} />

                {/* {(errors?.name) ? <span>{errors.name.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} name="name" type="text" placeholder="Name..." /> */}

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

export default UpdateCompany;

