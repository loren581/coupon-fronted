import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import TodoList from "../../Todo/TodoList/TodoList";
import AddTodo from "../../Todo/AddTodo/AddTodo";
import UpdateTodo from "../../Todo/UpdateTodo/UpdateTodo";
import DeleteTodo from "../../Todo/DeleteTodo/DeleteTodo";
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";
import Regiser from "../../Auth/Regiser/Regiser";
import TaskList from "../../Admin/TaskList/TaskList";
import UserList from "../../Admin/UserList/UserList";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import CompanyList from "../../Company/CompanyList/CompanyList";
import DeleteCompany from "../../Company/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../Company/UpdateCompany/UpdateCompany";
import CustomerList from "../../Customer/CustomerList/CustomerList";
import DeleteCustomer from "../../Customer/DeleteCustomer/DeleteCustomer";
import AddCustomer from "../../Customer/AddCustomer/AddCustomer";
import AddCompany from "../../Company/AddCompany/AddCompany";
import AddCoupon from "../../Coupon/AddCoupon/AddCoupon";
import CouponList from "../../Coupon/CouponList/CouponList";
import UpdateCustomer from "../../Customer/UpdateCustomer/UpdateCustomer";
import UpdateCoupon from "../../Coupon/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../Coupon/DeleteCoupon/DeleteCoupon";
import CouponListMaxPrice from "../../Coupon/CouponListMaxPrice/CouponListMaxPrice";
import CouponListMaxPriceList from "../../Coupon/CouponListMaxPriceList/CouponListMaxPriceList";
import CouponListCategoryForm from "../../Coupon/CouponListCategoryForm/CouponListCategoryForm";
import CouponListCategoryList from "../../Coupon/CouponListCategoryList/CouponListCategoryList";
import SingleCompanyCard from "../../Company/SingleCompanyCard/SingleCompanyCard";
import SingleCompany from "../../Company/SingleCompany/SingleCompany";
import SingleCustomerCard from "../../Customer/SingleCustomerCard/SingleCustomerCard";
import SingleCustomer from "../../Customer/SingleCustomer/SingleCustomer";
import CouponListAll from "../../Coupon/CouponListAll/CouponListAll";
import PurchaseCoupon from "../../Coupon/PurchaseCoupon/PurchaseCoupon";
import CouponListCustomer from "../../Coupon/CouponListCustomer/CouponListCustomer";

function Routing(): JSX.Element {
    const clientType = useSelector((state: RootState) => state.guardReducer.clientType);

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/home" element={<Home/>} />
                <Route index element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Regiser/>} />
                <Route path="/logout" element={<Logout/>} />
                {clientType==="ADMINISTRATOR" &&<Route path="/customers/add" element={<AddCustomer/>} />}


                
                <Route path="/coupons/add" element={<AddCoupon/>} />
                {clientType==="ADMINISTRATOR" &&<Route path="/companies/add" element={<AddCompany/>} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/companies/update/:id" element={<UpdateCompany/>} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/customers/update/:id" element={<UpdateCustomer/>} />}
                <Route path="/coupons/update/:id" element={<UpdateCoupon/>} />
                {clientType==="ADMINISTRATOR" && <Route path="/companies/delete/:id" element={<DeleteCompany />} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/customers/delete/:id" element={<DeleteCustomer />} />}
                {clientType==="CUSTOMER" &&<Route path="/coupons/purchase/:id" element={<PurchaseCoupon />} />}
                {clientType==="CUSTOMER" &&<Route path="/coupons" element={<CouponListCustomer />} />}
                {clientType==="CUSTOMER" &&<Route path="/coupons/all" element={<CouponListAll />} />}
                {clientType==="ADMINISTRATOR" && <Route path="/companies/:id" element={<SingleCompanyCard />} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/customers/:id" element={<SingleCustomerCard />} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/companies/search" element={<SingleCompany />} />}
                {clientType==="ADMINISTRATOR" && <Route path="/customers/search" element={<SingleCustomer />} />}
                <Route path="/coupons/delete/:id" element={<DeleteCoupon />} />
                {clientType==="ADMINISTRATOR" &&<Route path="/companies" element={<CompanyList />} />}
                {clientType==="ADMINISTRATOR" &&<Route path="/customers" element={<CustomerList />} />}
                {clientType==="COMPANY" &&<Route path="/coupons" element={<CouponList />} />}
                {clientType==="COMPANY" ||"CUSTOMER" &&<Route path="/coupons/maxPrice/form" element={<CouponListMaxPrice />} />}
                {clientType==="COMPANY"||"CUSTOMER" &&<Route path="/coupons/category/form" element={<CouponListCategoryForm />} />}
                {clientType==="COMPANY"||"CUSTOMER" &&<Route path="/coupons/maxPrice/list" element={<CouponListMaxPriceList />} />}
                {clientType==="COMPANY" ||"CUSTOMER" &&<Route path="/coupons/category/list" element={<CouponListCategoryList />} />}
                {clientType==="CUSTOMER" &&<Route path="/coupons/purchase" element={<CouponListAll />} />}
                <Route path="*" element={<Page404/>} />
            </Routes>
        </div>
    );
}

export default Routing;
