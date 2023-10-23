import axios, {AxiosError} from "axios"
import { parseCookies } from "nookies"
import { AuthTokenErrors } from "./err/AuthTokenErrors"
import { signOut } from "../contexts/AuthContext"

export function setupAPIClient(ctx = undefined) {
    const { '@nextauth.token': token } = parseCookies(ctx);


    const api = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    api.interceptors.response.use(response =>{
        return response
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //qualquer error 401 não autorizado
            if(typeof window !== undefined){
                signOut()
            }else{
                return Promise.reject(new AuthTokenErrors())
            }
        }

        return Promise.reject(error)
    })

    return api
}