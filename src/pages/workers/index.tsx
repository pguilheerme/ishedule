import Head from "next/head"
import styles from "./styles.module.scss"
import Image from "next/image";
import plus from "../../../public/plus.svg";
import dtWorker from "../../../public/dtWorker.svg";
import pencil from "../../../public/pencil.svg";
import trash from "../../../public/trash.svg";

export default function Workers() {
    return (
        <>
            <Head>
                <title>Profissionais | Ischedule</title>
            </Head>
            <div className={styles.containerCenter}>
                <div className={styles.containerTop}>
                    <p>Membros</p>
                    <button className={styles.btnNew}>
                        Novo 
                        <Image src={plus} alt="plus" width={20} />
                    </button>
                </div>
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