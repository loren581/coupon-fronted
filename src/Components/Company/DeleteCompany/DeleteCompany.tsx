import { useNavigate, useParams } from "react-router-dom";
import "./DeleteCompany.css"; // Update with your CSS path

import notifyService from "../../../Services/NotificationService";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState"; // Update with the correct action name
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";

function DeleteCompany(): JSX.Element { // Rename the function to DeleteCompany

    const dispatch = useDispatch();

    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        webApiService.deleteCompany(id) // Update with the correct delete method
            .then(() => {
                notifyService.success(`Deleted company #${id} successfully`);
                dispatch(deletedCompanyAction(id)); // Update with the correct action
                navigate(-1);
            })
            .catch(err => notifyService.error(err))
    }

    const no = () => {
        navigate(-1);
    }

    return (
        <div className="DeleteCompany"> {/* Update with the correct class name */}
            <h1>Delete Company</h1>
            <p>Are you sure you want to delete company #{id}?</p>
            <div className="row">
                <button onClick={yes} className="danger">Yes</button>
                <button onClick={no}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteCompany; // Update with the correct export

