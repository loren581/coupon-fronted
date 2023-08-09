import "./AddCompany.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { CompanyModel } from "../../../Models/Company";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
function AddCompany(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const schema = zod.object({
        name: zod.string().nonempty("you must enter  name"),
        email: zod.string().email("Enter a valid email").nonempty("You must enter an email"),
        password: zod.string().nonempty("You must enter a password"),


    });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<CompanyModel>({ mode: "all", resolver: zodResolver(schema) });



    const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {

        return webApiService.addCompany(data)
            .then(res => {
                notifyService.success('Added Company sucessfully');
                // store.dispatch(addedTaskAction(res.data));
                dispatch(addedCompanyAction(res.data));
                navigate("/companies");
            })
            .catch(err => notifyService.error(err))



    };





    return (
        <div className="AddCompany form-look-and-feel">
            <h1>Add new Company</h1>


            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
               

                {(errors?.name) ? <span>{errors.name.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} name="name" type="text" placeholder="Name..." />

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} type="text" name="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid || isSubmitting}>ADD</button>
            </form>
        </div>
    );
}

export default AddCompany;
