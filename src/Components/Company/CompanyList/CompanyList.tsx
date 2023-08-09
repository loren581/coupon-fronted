import { CompanyModel } from "../../../Models/Company";
import "./CompanyList.css";
import { comppaniesReducer, gotAllCompanyAction } from '../../../Redux/CompanyAppState';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CompanyCard from "../CompanyCard/CompanyCard";
import { AxiosError } from 'axios';
import store, { RootState } from '../../../Redux/Store';

function CompanyList(): JSX.Element {
        // State = React Mechanism for managing data in component
        const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.companies);

        const dispatch = useDispatch();

        // Effect = very very very very long operation...
        useEffect(() => {
    
            if (companies.length > 0) {
                return;
            }
    
            webApiService.getAllCompanies()
                .then(res => {
                    notifyService.success('Woho I got some companies');
                    setCompanies(res.data);
                    // store.dispatch(gotAllTasksAction(res.data));
                    dispatch(gotAllCompanyAction(res.data));
                    console.log(res.data);
                })
                .catch((err)=>{console.log(err);})
    
        }, []);
        // setCompanies (useSelector((state: RootState) => state.companiesReducer.companies));


    
    return (
        <div className="CompanyList">
			            <h1>Company List</h1>

{
    (companies.length !== 0) ?

        companies.map((c, idx) => <CompanyCard key={`company-card-${idx}`} company={c} />) :
        <EmptyView
            title={"No Items Found"}
            description={"there are no companies available right now"} />
}
        </div>
    );
}

export default CompanyList;
