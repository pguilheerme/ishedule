import Head from "next/head"
import styles from "./styles.module.scss"

export default function Profile() {
    return(
        <>
        <Head>
            <title>Perfil | Ischedule</title>
        </Head>
            <div className={styles.containerCenter}>
                profile
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