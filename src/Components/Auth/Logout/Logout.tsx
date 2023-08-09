import { useEffect } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { removeAccess } from "../../../Redux/GuardAppState";
import { clearAllCompanies } from "../../../Redux/CompanyAppState";
import { clearAllCustomers } from "../../../Redux/CustomerAppState";
import { clearAllCoupons } from "../../../Redux/CouponAppState";

function Logout(): JSX.Element {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearAllCompanies())
        dispatch(clearAllCustomers())
        dispatch(clearAllCoupons())
        dispatch(userLoggedOut());
        dispatch(removeAccess())
        navigate("/login");
    }, []);
    return (
        <></>
    );
}

export default Logout;
