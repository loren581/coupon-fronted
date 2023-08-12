class UrlService{
     private port = 8080;
     private baseUrl = `http://localhost:${this.port}`;
     public admin=this.baseUrl+"/api/admin";
     public company=this.baseUrl+"/api/company";
     public customer=this.baseUrl+"/api/customer";
    public todo = this.baseUrl + "/api/tasks";
    public user = this.baseUrl + "/api/users/tasks";
    public auth = this.baseUrl + "/api/auth";
    public todoMock = 'https://raw.githubusercontent.com/KobiShashs/TODO-JSON/main/tasks';
}

const urlService = new UrlService();
export default urlService;