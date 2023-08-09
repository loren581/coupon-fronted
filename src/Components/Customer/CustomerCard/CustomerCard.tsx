import { CustomerModel } from "../../../Models/Customer"; // Switched to CustomerModel
import "./CustomerCard.css"; // Updated CSS path
import { Link } from "react-router-dom";

interface CustomerCardProps { // Switched to CustomerCardProps
    customer: CustomerModel; // Switched to CustomerModel
}

function CustomerCard(props: CustomerCardProps): JSX.Element { // Switched to CustomerCardProps
    return (
        <div className="CustomerCard card"> {/* Switched class name */}
            <p>id: {props.customer.id}</p>
            <p>first name: {props.customer.firstName}</p>
            
            <p>last name: {props.customer.lastName}</p>
            <p>email : {props.customer.email}</p>
            <hr />
            <div className="row"> {/* Switched class name */}
                <Link to={`/customers/update/${props.customer.id}`}><button>✏️ Edit Customer</button></Link> {/* Switched link path and button text */}
                <Link to={`/customers/delete/${props.customer.id}`}><button>🗑️ Delete Customer</button></Link> {/* Switched link path and button text */}
            </div>
        </div>
    );
}

export default CustomerCard;

