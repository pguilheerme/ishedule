import Head from "next/head"
import styles from "./styles.module.scss"
import Image from "next/image";
import plus from "../../../public/plus.svg";
import { WorkerCard } from "@/components/WorkerCard";

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
                <WorkerCard name="Antonia Pereira" role="Gerente" avatar="" />
                <WorkerCard name="Fernando Lima" role="Estagiário" avatar="" />
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