import axios, { AxiosInstance } from 'axios';
import CONST from './const';

export const AxiosClient = axios.create({
     baseURL: CONST.REQUEST.API_ADDRESS,
     timeout: CONST.REQUEST.REQUEST_TIMEOUT,
     headers: {
          'Content-Type': 'application/json',
     },
     withCredentials: true,
});

const HEADER = {
     API_KEY: 'x-api-key',
     AUTHORIZATION: 'authorization',
};

const refreshAccessToken = async () => {
     try {
          // Gọi API refresh token
          const response = await axios.get('/auth/refresh', {
               withCredentials: true, // Gửi cookies kèm theo request
          });
          const { accessToken } = response.data.accessToken;
          // Lưu accessToken mới vào localStorage
          localStorage.setItem('ACCESS_TOKEN', accessToken);

          return accessToken;
     } catch (err) {
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('USER_INFO');
          window.location.href = '/auth/login';
          return Promise.reject(err);
     }
};

const getAuthHeaders = () => {
     const headers = {
          [HEADER.API_KEY]: process.env.REACT_APP_API_KEY || 'your-api-key', // Nếu env không đúng
     };

     const token = localStorage.getItem('ACCESS_TOKEN');
     if (token) {
          headers[HEADER.AUTHORIZATION] = `Bearer ${token}`;
     }

     return headers;
};

const registerInterceptorsRequest = (clientInstance: AxiosInstance) => {
     clientInstance.interceptors.request.use(
          async (config) => {
               if (config.headers) {
                    Object.assign(config.headers, getAuthHeaders());
               }
               return config;
          },
          (error: any) => {
               return Promise.reject(error);
          },
     );
};

registerInterceptorsRequest(AxiosClient);

const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
     clientInstance.interceptors.response.use(
          (response: any) => {
               const res = response?.data || response;
               return res;
          },
          async (error: any) => {
               const originalRequest = error.config;

               if (originalRequest.url.includes('/auth/login')) {
                    return Promise.reject(error);
               }

               if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                         const newAccessToken = await refreshAccessToken();

                         if (!newAccessToken) {
                              window.location.href = '/auth/login';
                              return Promise.reject(error);
                         }

                         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                         return axios({
                              ...originalRequest,
                              withCredentials: true,
                         });
                    } catch (err) {
                         window.location.href = '/auth/login';
                         return Promise.reject(err);
                    }
               }

               if (error.response && error.response.status === 403) {
                    // window.location.href = '/auth/login';
                    return Promise.reject(error);
               }
               return Promise.reject(error);
          },
     );
};
registerInterceptorResponse(AxiosClient);

const setConfigAxiosClient = (accessToken: any, clientAxiosInstance: AxiosInstance) => {
     clientAxiosInstance.defaults.headers.common = {
          'Content-Type': 'application/json',
     };
     clientAxiosInstance.defaults.timeout = CONST.REQUEST.REQUEST_TIMEOUT;
     if (accessToken) {
          clientAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
     }
};

export function setConfigAxios(accessToken: any) {
     setConfigAxiosClient(accessToken, AxiosClient);
}

const post = (url: string, data?: any, config = {}) => {
     return AxiosClient.post(url, data, config);
};

const get = (url: string, config = {}) => {
     return AxiosClient.get(url, config);
};

const put = (url: string, data?: any, config = {}) => {
     return AxiosClient.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
     return AxiosClient.patch(url, data, config);
};

const del = (url: string, config = {}) => {
     return AxiosClient.delete(url, config);
};
const MSTFetch = {
     post,
     get,
     put,
     patch,
     delete: del,
};

export default MSTFetch;
