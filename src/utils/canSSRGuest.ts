import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

//Função para paginas de visitantes(!user)
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx)

        //Se tentar acessar a pagina porem tem login redirecionamos 
        if(cookies ["@nextauth.token"]){
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                }
            }
        }


        return await fn(ctx)
    }

}