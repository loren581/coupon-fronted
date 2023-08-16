import { Link } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

function Menu(): JSX.Element {

    const clientType = useSelector((state: RootState) => state.guardReducer.clientType);
    return (
        <div className="Menu">
            <Link to="/home">🏠 Home</Link>
            {clientType==="ADMINISTRATOR" && <Link to={"/companies"}>📋 Your companies </Link>}
            {clientType==="ADMINISTRATOR" && <Link to={"/customers"}>📋 Your customers </Link>}
            {clientType==="ADMINISTRATOR" &&<Link to={"/customers/add"}>➕ new customer</Link>}
            {clientType==="ADMINISTRATOR" &&<Link to={"/companies/add"}>➕ new company</Link>}
            {clientType==="ADMINISTRATOR" &&<Link to={"/companies/search"}>search company by id</Link>}
            {clientType==="ADMINISTRATOR" &&<Link to={"/customers/search"}>search customer by id</Link>}
            {clientType==="COMPANY" &&<Link to={"/coupons/add"}>➕ new coupon</Link>}
            {clientType==="COMPANY" &&<Link to={"/coupons"}>Your coupons</Link>}
            {(clientType==="COMPANY" || clientType=== "CUSTOMER")  &&<Link to={"/coupons/maxPrice/form"}>Your coupons by max price</Link>}
            {clientType==="CUSTOMER" &&<Link to={"/coupons/all"}>Purchase</Link>}
            {clientType==="CUSTOMER" &&<Link to={"/coupons"}>Your Coupons</Link>}
            {(clientType==="COMPANY" || clientType==="CUSTOMER") &&<Link to={"/coupons/category/form"}>Your coupons by category</Link>}
            <Link to={"/about"}>🤯 About</Link>
        </div>
    );
}

export default Menu;
