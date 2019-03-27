import axios  from 'axios';
import Config from 'Config';

class HTTPClient {
    basePORT = '';


    constructor(){
        console.log(process.env.IP_ADDRESS)
        this.baseURL ="http://"+process.env.IP_ADDRESS+":"+ `${Config.basePORT}/api`;
        this.axiosClient = axios.create();
        this.axiosClient.defaults.timeout = 30000;
        this.token = '';

        this.axiosClient.interceptors.request.use(
            (request) => {
                const method = request.method.toUpperCase()
                const url  = request.url.replace(this.baseURL, '');
                console.log(`Request: ${method} ${url}`);
                return request;
            },
            (error) =>  {
                console.log("Error: "+error);
                return Promise.reject(error);
            }

        );

        this.axiosClient.interceptors.response.use(
            (response) => {
                const  { status, text} = (response);
                console.log(`Response: ${status}  ${text}`);
                return response;
            },
            (error) => {
                console.log("Error: "+error);

            }

        );




    }

    Get(url) {
        return this.axiosClient.get(`${this.baseURL}/${url}`);
    }
    Patch(url) {
        return this.axiosClient.patch(`${this.baseURL}/${url}`);
    }
    
    /** This method executes a REST POST request */
    Post(url, data) {
         return this.axiosClient.post(`${this.baseURL}/${url}`, data);
    }
    
      /** This method executes a REST PUT request */
    Put(url, data) {
        return this.axiosClient.put(`${this.baseURL}/${url}`, data);
    }
    
      /** This method executes a REST DELETE request */
    Delete(url) {
        return this.axiosClient.delete(`${this.baseURL}/${url}`);
    }
}

const httpClient = new HTTPClient();
export default httpClient;