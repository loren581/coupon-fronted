import notifyService from "../../../Services/NotificationService";
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";
import { useParams, useNavigate } from 'react-router-dom'; // Import the missing hooks

function PurchaseCoupon(): JSX.Element { // Rename the function to DeleteCoupon

    const dispatch = useDispatch();

    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        webApiService.purchaseCoupon(id) // Update with the correct delete method
            .then(() => {
                notifyService.success(`Purchased coupon #${id} successfully`);
                navigate(-1);
            })
            .catch(err => notifyService.error(err.response.data.description))
    }

    const no = () => {
        navigate(-1);
    }

    return (
        <div className="PurchaseCoupon"> {/* Update with the correct class name */}
            <h1>Purchase Coupon</h1>
            <p>Are you sure you want to purchase coupon #{id}?</p>
            <div className="row">
                <button onClick={yes} className="danger">Yes</button>
                <button onClick={no}>Cancel</button>
            </div>
        </div>
    );
}

export default PurchaseCoupon; // Update with the correct export

