import "./SingleCustomerCard.css";
import { useEffect, useState } from "react";
import store, { RootState } from '../../../Redux/Store';
import { CustomerModel } from "../../../Models/Customer";
import CustomerCard from "../CustomerCard/CustomerCard";

function SingleCustomerCard(): JSX.Element {
        // State = React Mechanism for managing data in component
        const [customer] = useState<CustomerModel>(store.getState().customersReducer.customer);



    
            
    
          


    
    return (
        <div className="Customer">
			            <h1>Customer </h1>

{

         <CustomerCard customer={customer} /> 
}
        </div>
    );
}

export default SingleCustomerCard;
