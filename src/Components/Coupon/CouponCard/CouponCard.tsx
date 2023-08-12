import "./CouponCard.css"; // Update with your CSS path
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    const clientType = useSelector((state: RootState) => state.guardReducer.clientType);

    return (
        <div className="CouponCard card">
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
            {clientType==="COMPANY" && <Link to={`/coupons/update/${props.coupon.id}`}><button>✏️ Edit Coupon</button></Link>}
            {clientType==="COMPANY" &&   <Link to={`/coupons/delete/${props.coupon.id}`}><button>🗑️ Delete Coupon</button></Link>}
            {clientType==="CUSTOMER" &&   <Link to={`/coupons/purchase/${props.coupon.id}`}><button>Purchase Coupon</button></Link>}
            </div>
        </div>
    );
}

export default CouponCard;
