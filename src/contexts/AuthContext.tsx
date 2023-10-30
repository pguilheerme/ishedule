import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import  Router  from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { firebase, auth } from "@/services/firebase";


type AuthContextData = {
    user?: UserProps,
    isAuthenticated?: boolean,
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void,
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string,
    name: string,
    email: string,
}

type SignUpProps = {
    name?: string,
    email?: string,
    password?: string
}

type SignInProps = {
    email: string,
    password: string,
}

type AuthProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push("/")
    }
    catch(err){
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { '@nextauth.token': token } = parseCookies();
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {

        // tentar pegar algo no cookie
    
        if(token){
      
          api.get('/info').then(response => {
            const { id, name, email } = response.data;
    
            setUser({
              id,
              name,
              email
            })
    
          })
          .catch(() => {

            signOut();
          })
        }
    
    
      }, [])

    async function signIn ({email, password}: SignInProps) {
        try{
            const res = await api.post('/auth', {
                email,
                password
            })

            //console.log(res.data)

            const { id, name, token } = res.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expirar em 1 mes
                path: "/" // quais caminhos terao acesso a cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //Passar token para as proximas requisicoes 

            api.defaults.headers["Authorization"] = `Bearer ${token}`

            toast.success("Logado com sucesso!")

            //Redirecionar para /dashboard
            Router.push("/dashboard")


        }catch(err){
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar", err)
        }
    }

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        if(result.user){
            const { displayName ,email, uid, getIdToken } = result.user

            if(!result.user){
                throw new Error
            }


            setUser({
                id: uid,
                name: displayName,
                email: email,
            })
        }


    }

    async function signUp({name, email, password}: SignUpProps) {
        try{
            const res = await api.post("/user/company", {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso!")

            Router.push("/")

        }catch(err){
            toast.error("Erro ao cadastrar!")
            console.log("ERRO AO CADASTRAR", err)
        }
    }



    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp,  }}>
            {children}
        </AuthContext.Provider>
    )
}