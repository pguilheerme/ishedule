import { Header } from "@/components/Header"
import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"

export default function Dashboard() {
    return (
        <>
         <Header/>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})