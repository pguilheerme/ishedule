import Head from "next/head"
import styles from "./styles.module.scss"
import Image from "next/image";
import plus from "../../../public/plus.svg";
import { WorkerCard } from "@/components/WorkerCard";
import { useState } from "react";
import { BasicModal } from "@/components/Modal";

export default function Workers() {
    const [openModal, setOpenModal] = useState(false)
    const handleCloseModal = () => setOpenModal(false)
    const func = [
    ]

    return (
        <>
            <Head>
                <title>Profissionais | Ischedule</title>
            </Head>
            <div className={styles.containerCenter}>
                <div className={styles.containerTop}>
                    <p>Membros</p>
                    <button className={styles.btnNew} onClick={() => setOpenModal(true)}>
                        Novo
                        <Image src={plus} alt="plus" width={20} />
                    </button>
                </div>
                {func.map( (e) => <WorkerCard name={e.name} role={e.role} avatar="" func={e} />)}
            </div>

            <BasicModal open={openModal} onClose={handleCloseModal}/>
        </>
    )
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//     const apiClient = setupAPIClient(ctx)

//     return {
//         props: {}
//     }
// })