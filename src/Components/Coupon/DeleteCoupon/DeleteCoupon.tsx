import notifyService from "../../../Services/NotificationService";
import { deletedCouponAction } from "../../../Redux/CouponAppState"; // Update with the correct action name
import { useDispatch } from 'react-redux';
import webApiService from "../../../Services/WebApiService";
import { useParams, useNavigate } from 'react-router-dom'; // Import the missing hooks

function DeleteCoupon(): JSX.Element { // Rename the function to DeleteCoupon

    const dispatch = useDispatch();

    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        webApiService.deleteCoupon(id) // Update with the correct delete method
            .then(() => {
                notifyService.success(`Deleted coupon #${id} successfully`);
                dispatch(deletedCouponAction(id)); // Update with the correct action
                navigate(-1);
            })
            .catch(err => notifyService.error(err))
    }

    const no = () => {
        navigate(-1);
    }

    return (
        <div className="DeleteCoupon"> {/* Update with the correct class name */}
            <h1>Delete Coupon</h1>
            <p>Are you sure you want to delete coupon #{id}?</p>
            <div className="row">
                <button onClick={yes} className="danger">Yes</button>
                <button onClick={no}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteCoupon; // Update with the correct export

