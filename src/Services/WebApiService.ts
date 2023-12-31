import axios, { AxiosResponse } from 'axios';
import { TodoModel } from './../Models/Todo';
import urlService from './UrlService';
import { LoginReqModel, LoginResModel } from '../Models/Login';
import store from './../Redux/Store'
import { RegisterReqModel } from '../Models/Register';
import { CouponModel } from '../Models/Coupon';
import { CompanyModel } from '../Models/Company';
import { CustomerModel } from '../Models/Customer';
import { CompanyModelAdd } from '../Models/CompanyAdd';
import { userReducer } from '../Redux/UserAppState';
import { CouponModelAdd } from '../Models/CouponModelAdd';
import { CouponModelUpdate } from '../Models/CouponModelUpdate';
import { maxPriceModel } from '../Models/maxPrice';
import { CouponCustomerModel } from '../Models/CouponCustomer';
class WebApiService {

    public login(data: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
        return axios.post<LoginResModel>(urlService.auth + "/login", data);
    }

    public register(data: RegisterReqModel): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register", data);
    }

    public getAllTasks(): Promise<AxiosResponse<TodoModel[]>> {
        return axios.get<TodoModel[]>(urlService.todo);
    }

    public getAllTasksAuth(): Promise<AxiosResponse<TodoModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<TodoModel[]>(urlService.user, { headers });
    }

    public addTaskAuth(todo: TodoModel): Promise<AxiosResponse<TodoModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<TodoModel>(urlService.user, todo, { headers });
    }

    public deleteTaskAuth(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<any>(`${urlService.user}/${id}`, { headers })
    }

    public updateTaskAuth(id: number, todo: TodoModel): Promise<AxiosResponse<TodoModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${urlService.user}/${id}`, todo, { headers });
    }
    
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const headers= {'Authorization': store.getState().userReducer.user.token}
        return axios.get<CompanyModel[]>(urlService.admin+"/companies",{headers});
    }
    public deleteCompany(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<any>(`${urlService.admin+"/companies"}/${id}`, { headers })
    }

    public updateCompany(id: number, company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put<CompanyModel>(`${urlService.admin+"/companies"}/${id}`, company, { headers });
    }

    public updateCustomer(id: number, customer: CustomerModel): Promise<AxiosResponse<void>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put<void>(`${urlService.admin+"/customers"}/${id}`, customer, { headers });
    }

    public getAllCustomer(): Promise<AxiosResponse<CustomerModel[]>> {
        const headers= {'Authorization': store.getState().userReducer.user.token}
        return axios.get<CustomerModel[]>(urlService.admin+"/customers",{headers});
    }
    public deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<any>(`${urlService.admin+"/customers"}/${id}`, { headers });
    }
    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<CustomerModel>(urlService.admin+"/customers", customer, { headers });
    }
    public addCompany(company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<CompanyModel>(urlService.admin+"/companies", company, { headers });
    }
    public addCoupon(coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<CouponModel>(urlService.company, coupon, { headers });
    }
    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers= {'Authorization': store.getState().userReducer.user.token}
        return axios.get<CouponModel[]>(urlService.company+"/coupons",{headers});
    }
    
    public updateCoupon(id: number, coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put<CouponModel>(`${urlService.company}/${id}`, coupon, { headers });
    }
    public deleteCoupon(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<any>(`${urlService.company}/${id}`, { headers });
    }

    public getAllCouponsByMaxPrice(val: number): Promise<AxiosResponse<CouponModel[]>> {
        const headers = {'Authorization': store.getState().userReducer.user.token};
        const url = `${urlService.company}/coupons/maxPrice`;
    
        return axios.get<CouponModel[]>(url, {
            params: { val }, // Pass the maxPrice as a parameter
            headers: headers
        });
    }

    public getAllCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        const headers = {'Authorization': store.getState().userReducer.user.token};
        const url = `${urlService.company}/coupons/category`;
    
        return axios.get<CouponModel[]>(url, {
            params: { category }, // Pass the maxPrice as a parameter
            headers: headers
        });
    }
    public getSingleCompany(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<any>(`${urlService.admin+"/companies"}/${id}`, { headers });
    }
    public getSingleCustomer(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<any>(`${urlService.admin+"/customers"}/${id}`, { headers });
    }
    public getAllCouponsByCategoryAsCustomer(val: string): Promise<AxiosResponse<CouponModel[]>> {
        const headers = {'Authorization': store.getState().userReducer.user.token};
        const url = `${urlService.customer}/coupons/category`;
    
        return axios.get<CouponModel[]>(url, {
            params: { val }, // Pass the maxPrice as a parameter
            headers: headers
        });
    }

    public getAllCouponsByMaxPriceAsCustomer(val: number): Promise<AxiosResponse<CouponModel[]>> {
        const headers = {'Authorization': store.getState().userReducer.user.token};
        const url = `${urlService.customer}/coupons/maxPrice`;
    
        return axios.get<CouponModel[]>(url, {
            params: { val }, // Pass the maxPrice as a parameter
            headers: headers
        });
    }

    public getAllCouponsAsCustomer(): Promise<AxiosResponse<CouponModel[]>> {
        const headers= {'Authorization': store.getState().userReducer.user.token}
        return axios.get<CouponModel[]>(urlService.customer+"/coupons",{headers});
    }

    public getAllCouponsAll(): Promise<AxiosResponse<CouponCustomerModel[]>> {
        const headers= {'Authorization': store.getState().userReducer.user.token}
        return axios.get<CouponCustomerModel[]>(urlService.customer+"/coupons/all",{headers});
    }

    public purchaseCoupon(id: number): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        console.log(headers);
        return axios.post<CouponModel>(`${urlService.customer}/${id}`,null ,{ headers });
    }
    
    

}

const webApiService = new WebApiService();
export default webApiService;