import axios from "axios";

export const setLoadingInterceptor = ({ showLoading, stopLoading}) => {
    axios.interceptors.request.use(
        req => {
            if(!(req.data instanceof FormData)) showLoading()
            return req
        },
        error => {
            stopLoading()
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        res => {
            stopLoading()
            return res 
        },
        error => {
            stopLoading()
            return Promise.reject(error)
        }
    )
}

export default setLoadingInterceptor