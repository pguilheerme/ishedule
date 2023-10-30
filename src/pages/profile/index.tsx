import Head from "next/head";
import styles from "./styles.module.scss";
import Image from "next/image";
import cameraAdd from "../../../public/cameraAdd.svg";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Perfil | Ischedule</title>
      </Head>
      <div className={styles.containerCenter}>
      </div>
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//     const apiClient = setupAPIClient(ctx)

//     return {
//         props: {}
//     }
// })
