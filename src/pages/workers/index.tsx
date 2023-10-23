import Head from "next/head"
import styles from "./styles.module.scss"

export default function Workers() {
    return (
        <>
            <Head>
                <title>Profissionais | Ischedule</title>
            </Head>
            <div className={styles.containerCenter}>
                workers
            </div>
        </>
    )
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//     const apiClient = setupAPIClient(ctx)

//     return {
//         props: {}
//     }
// })