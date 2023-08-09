import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginReqModel } from "../../../Models/Login";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { loggedInAsAdmin, loggedInAsCompany, loggedInAsCustomer } from "../../../Redux/GuardAppState";
import Regiser from '../Regiser/Regiser';
function Login(): JSX.Element {


  
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().email("You should provide valid email"),
        password: zod.string().min(4, "Minimum 4 characters"),
        clientType: zod.enum(["ADMINISTRATOR", "CUSTOMER", "COMPANY"]),
    });

    const { register, handleSubmit,
        formState: { errors, isValid, isSubmitting } }
        = useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

        const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {
            const clientTypeElement = document.getElementById("clientType") as HTMLSelectElement;
            const clientType = clientTypeElement.value;          
            if (!clientType) {
              // Handle the case when clientType is not selected
              return;
            }
          
            data.clientType = clientType;
          
            return webApiService
              .login(data)
              .then((res) => {
                dispatch(userLoggedIn(res.data));
                navigate("/home");
                console.log(res.data)
                if (data.clientType==="ADMINISTRATOR") {
                  dispatch(loggedInAsAdmin());}
                   if (data.clientType==="COMPANY") {
                    dispatch(loggedInAsCompany());}
                    if (data.clientType==="CUSTOMER") {
                        dispatch(loggedInAsCustomer());}
                  
                }
              )
              .catch((err) => {
                console.error('Error:', err.response.data);
                notifyService.error(err.response.data.description); // Show the error message to the user
              });          };
          
    return (
        <div className="Login form-look-and-feel">
            <h1>Login</h1>
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} name="email" type="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="password" placeholder="Password..." />

                {(errors?.clientType) ? <span>{errors.clientType.message}</span> : <label htmlFor="string">clientType</label>}
                <select {...register("clientType")} name="clientType" id="clientType">
  <option value="ADMINISTRATOR">ADMINISTRATOR</option>
  <option value="CUSTOMER">CUSTOMER</option>
  <option value="COMPANY">COMPANY</option>
</select>

                <button disabled={!isValid || isSubmitting}>Login</button>
            </form>
        </div>
    );
}

export default Login;
