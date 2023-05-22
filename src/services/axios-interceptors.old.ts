import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { Session } from "next-auth";
import { getSession, useSession, signOut } from 'next-auth/react';

/**
  const instance = axios.create({ baseURL: `${process.env.API_URL}/items`});
  instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCES_TOKEN}`;
  instance.defaults.headers.common['Accept'] = 'application/json';
 */
interface AppSession extends Session {
  token: {
    accessToken: string
  }
}
const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession() as AppSession;
    
    const {url = ''} = config;
    let authorization: any = session && session.token ? { 'Authorization': `Bearer ${session.token.accessToken}` } : {};
    authorization = url.startsWith('backoffice') ?  { 'Authorization':`Bearer ${process.env.BACKOFFICE_API_TOKEN}`} : authorization;

    const urlToCall = url.startsWith('backoffice') ? url.replaceAll('backoffice', 'items') : `${url}`;
    const baseURL = url.startsWith('backoffice') ? process.env.BACKOFFICE_API : process.env.API_URL;
console.log('====================================');
console.log(baseURL, url);
console.log('====================================');
    return {
      ...config,
      url: urlToCall,
      baseURL,
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'service-id': `${process.env.SERVICE_ID}`,
        'service-key': `${process.env.SERVICE_KEY}`,
        ...(authorization)
      } 
    };
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    if(error.response && error.response.status === 401) {
      signOut({callbackUrl: '/'})
    }    
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}