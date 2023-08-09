import "./CustomerList.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CompanyCard from "../CustomerCard/CustomerCard";
import { CustomerModel } from "../../../Models/Customer";
import store from "../../../Redux/Store";
import { gotAllCustomerAction } from "../../../Redux/CustomerAppState";

function CustomerList(): JSX.Element {
        // State = React Mechanism for managing data in component
        const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().customersReducer.customers);

        const dispatch = useDispatch();

        // Effect = very very very very long operation...
        useEffect(() => {
    
            if (customers.length > 0) {
                return;
            }
    
            webApiService.getAllCustomer()
                .then(res => {
                    notifyService.success('Woho I got some customers');
                    setCustomers(res.data);
                    // store.dispatch(gotAllTasksAction(res.data));
                    dispatch(gotAllCustomerAction(res.data));
                    console.log(res.data);
                })
                .catch((err)=>{console.log(err);})
    
        }, []);
        // setCompanies (useSelector((state: RootState) => state.companiesReducer.companies));


    
    return (
        <div className="CustomerList">
			            <h1>Customer List</h1>

{
    (customers.length !== 0) ?

        customers.map((c, idx) => <CompanyCard key={`customer-card-${idx}`} customer={c} />) :
        <EmptyView
            title={"No Items Found"}
            description={"there are no customers available right now"} />
}
        </div>
    );
}

export default CustomerList;

