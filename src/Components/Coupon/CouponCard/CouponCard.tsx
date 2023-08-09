import "./CouponCard.css"; // Update with your CSS path
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CompanyCard card">
            <p>id: {props.coupon.id}</p>
            <p>category: {props.coupon.category}</p>
            <p>title : {props.coupon.title}</p>
            <p>description : {props.coupon.description}</p>
            <p>start date : {props.coupon.startDate.toString()}</p>
            <p>end date : {props.coupon.endDate.toString()}</p>
            <p>amount : {props.coupon.amount}</p>
            <p>price : {props.coupon.price}</p>
            <p>image : {props.coupon.image}</p>
            <hr />
            <div className="row">
                <Link to={`/coupons/update/${props.coupon.id}`}><button>✏️ Edit Coupon</button></Link>
                <Link to={`/coupons/delete/${props.coupon.id}`}><button>🗑️ Delete Coupon</button></Link>
            </div>
        </div>
    );
}

export default CouponCard;
