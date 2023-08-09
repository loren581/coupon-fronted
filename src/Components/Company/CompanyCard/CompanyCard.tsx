import moment from "moment";
import { CompanyModel } from "../../../Models/Company"; // Replace with your actual Company model path
import "./CompanyCard.css"; // Update with your CSS path
import { Link } from "react-router-dom";

interface CompanyCardProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard card">
            <p>id: {props.company.id}</p>
            <p>name: {props.company.name}</p>
            <p>email : {props.company.email}</p>
            <hr />
            <div className="row">
                <Link to={`/companies/update/${props.company.id}`}><button>✏️ Edit Company</button></Link>
                <Link to={`/companies/delete/${props.company.id}`}><button>🗑️ Delete Company</button></Link>
            </div>
        </div>
    );
}

export default CompanyCard;
