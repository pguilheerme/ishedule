import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenErrors } from "../services/err/AuthTokenErrors"

//função para visitantes n poderem entrar sem logar 
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        const token = cookies["@nextauth.token"]

        if(!token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx)
        }catch(err){    
            if(err instanceof AuthTokenErrors){
                destroyCookie(ctx, "@nextauth.token")
                
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }

            }
        }
    }
}