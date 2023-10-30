import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import styles from "./styles.module.scss"
import Head from "next/head"

export default function Dashboard() {
    return (
        <> 
            <Head>
                <title>Dashboard | Ischedule</title>
            </Head>
            
            <div className={styles.containerCenter}>
                dashboard
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})