import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { firebase, auth } from "@/services/firebase";


type AuthContextData = {
    user?: UserProps,
    isAuthenticated?: boolean,
    signInWithEmailAndPassword: (credentials: SignInProps) => Promise<void>
    signOut: () => void,
    signUpWithEmailAndPassword: (credentials: SignUpProps) => Promise<void>
    signUpWithGoogle: (credentials: SignUpProps) => Promise<void>
    signInWithGoogle: () => Promise<void>
    signInWithFacebook: () => Promise<void>
}

type UserProps = {
    id: string,
    name?: string,
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
    try {
        destroyCookie(undefined, '@firebase.token')
        Router.push("/")
    }
    catch (err) {
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { '@firebase.token': token } = parseCookies();
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {

        // tentar pegar algo no cookie

        if (token) {

            api.get('/user/company', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                const { id, name, email } = response.data

                setUser({
                    id,
                    name,
                    email
                })

                console.log(response.data)


            })
                .catch((error) => {
                    console.log(error);

                    signOut();
                })
        }


    }, [])

    async function signUpWithEmailAndPassword({ email, password, name }: SignUpProps) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)

            if (userCredential) {

                const { uid, email } = userCredential.user;
                const token = await userCredential.user.getIdToken()

                setUser({
                    id: uid,
                    email: email,
                    name: name
                })

                const response = await api.post('/user/company', {
                    id: uid,
                    email: email,
                    name: name
                },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }

                )
                console.log(response);
            }


            Router.push("/")

            toast.success("Conta criada com sucesso!")


        } catch (err) {
            toast.error("Erro ao cadastrar!")
            console.log("ERRO AO CADASTRAR", err)
        }
    }

    async function signInWithEmailAndPassword({ email, password }: SignInProps) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)

            if (userCredential) {
                const { uid, email } = userCredential.user;
                const token = await userCredential.user.getIdToken()


                setUser({
                    id: uid,
                    email: email
                })

                const { data } = await api.get('/auth/company/signin', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`


                setCookie(undefined, "@firebase.token", data.access_token, {
                    maxAge: 60 * 60 * 24 * 30, //expirar em 1 mes
                    path: "/" // quais caminhos terao acesso a cookie
                })

                toast.success("Logado com sucesso!")
                Router.push("/dashboard")

            }
        } catch (error) {
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar", error)
        }

    }

    async function signInWithFacebook() {
        try {
            const provider = new firebase.auth.FacebookAuthProvider()
            const result = await auth.signInWithPopup(provider)

            if (result.user) {
                const { email, uid } = result.user
                const token = await result.user.getIdToken()

                setCookie(undefined, '@firebase.token', token, {
                    maxAge: 60 * 60 * 24 * 30, //expirar em 1 mes
                    path: "/" // quais caminhos terao acesso a cookie
                })

                setUser({
                    id: uid,
                    email: email,
                })

                api.defaults.headers["Authorization"] = `Bearer ${token}`

                toast.success("Logado com sucesso!")
                Router.push("/dashboard")

            }
        } catch (error) {
            toast.error("Erro ao acessar com Facebook!")
            console.log("Erro ao acessar", error)
        }

    }

    async function signUpWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const result = await auth.signInWithPopup(provider)

            if (result.user) {
                const { email, uid, displayName } = result.user
                const token = await result.user.getIdToken()

                setUser({
                    id: uid,
                    email: email,
                    name: displayName
                })

                const response = await api.post('/user/company', {
                    id: uid,
                    email: email,
                    name: displayName
                },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }

                )
                console.log(response);

                toast.success("Conta com o Google criada!")
                Router.push("/")

            }


        } catch (error) {
            toast.error("Erro ao criar conta com Google!")
            console.log(error)
        }
    }

    async function signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const result = await auth.signInWithPopup(provider)

            if (result.user) {
                const { email, uid, displayName } = result.user
                const token = await result.user.getIdToken()

                setUser({
                    id: uid,
                    email: email,
                    name: displayName
                })

                const { data } = await api.get('/auth/company/signin', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`

                console.log(data);
                

                setCookie(undefined, "@firebase.token", data.access_token, {
                    maxAge: 60 * 60 * 24 * 30, //expirar em 1 mes
                    path: "/" // quais caminhos terao acesso a cookie
                })


                toast.success("Logado com sucesso!")
                Router.push("/dashboard")

            }
        } catch (error) {
            toast.error("Erro ao acessar com Google!")
            console.log("Erro ao acessar", error)
        }

    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signUpWithGoogle, signUpWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithGoogle, signInWithFacebook }}>
            {children}
        </AuthContext.Provider>
    )
}