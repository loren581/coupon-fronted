import { useNavigate, useParams } from "react-router-dom";
import "./DeleteCustomer.css"; // Update with your CSS path

import notifyService from "../../../Services/NotificationService";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState"; // Update with the correct action name
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";

function DeleteCustomer(): JSX.Element { // Rename the function to DeleteCustomer

    const dispatch = useDispatch();

    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        webApiService.deleteCustomer(id) // Update with the correct delete method
            .then(() => {
                notifyService.success(`Deleted customer #${id} successfully`);
                dispatch(deletedCustomerAction(id)); // Update with the correct action
                navigate(-1);
            })
            .catch(err => notifyService.error(err))
    }

    const no = () => {
        navigate(-1);
    }

    return (
        <div className="DeleteCustomer"> {/* Update with the correct class name */}
            <h1>Delete Customer</h1>
            <p>Are you sure you want to delete customer #{id}?</p>
            <div className="row">
                <button onClick={yes} className="danger">Yes</button>
                <button onClick={no}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteCustomer; // Update with the correct export

