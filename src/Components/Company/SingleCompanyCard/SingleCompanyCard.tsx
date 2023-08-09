import { CompanyModel } from "../../../Models/Company";
import "./SingleCompanyCard.css";
import { comppaniesReducer, gotAllCompanyAction } from '../../../Redux/CompanyAppState';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CompanyCard from "../CompanyCard/CompanyCard";
import { AxiosError } from 'axios';
import store, { RootState } from '../../../Redux/Store';

function SingleCompanyCard(): JSX.Element {
        // State = React Mechanism for managing data in component
        const [company] = useState<CompanyModel>(store.getState().companiesReducer.companySingle);



    
            
    
          


    
    return (
        <div className="Company">
			            <h1>Company </h1>
<p>mosh</p>
{

         <CompanyCard company={company} /> 
}
        </div>
    );
}

export default SingleCompanyCard;
