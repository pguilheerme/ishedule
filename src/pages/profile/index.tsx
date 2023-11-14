import { useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import Image from "next/image";
import cameraAdd from "../../../public/cameraAdd.svg";
import { AiFillHeart } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { CiLock, CiUnlock } from "react-icons/ci";
import { ServiceCard } from "../../components/ServiceCard";

export default function Profile() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [imageBanner, setImageBanner] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");

  const [services, setServices] = useState([]);

  function handleBannerFile(e) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageBanner(image);
      setBannerUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleAvatarFile(e) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChangeCategory(e) {
    setCategorySelected(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Perfil | Ischedule</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.headerProfile}>
          <div className={styles.labelBanner}>
            <label htmlFor="inpBanner">
              <Image src={cameraAdd} alt="Camera add icon" width={40} className={styles.image} />
            </label>
            <input
              type="file"
              id='inpBanner'
              accept="image/png, image/jpeg"
              onChange={handleBannerFile}
            />

            {bannerUrl && (
              <Image
                src={bannerUrl}
                alt="Banner da loja"
                width={250}
                height={250}
                className={styles.bannerPreview}
              />
            )}
          </div>
          <div className={styles.avatar}>
            <div className={styles.labelAvatar}>
              <label htmlFor="inpAvatar">
                <Image src={cameraAdd} alt="Camera add icon" width={20} className={styles.image} />
              </label>
              <input
                type="file"
                id="inpAvatar"
                accept="image/png, image/jpeg"
                onChange={handleAvatarFile}
              />

              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={50}
                  height={50}
                  className={styles.avatarPreview}
                />
              )}
            </div>
            <div className={styles.info}>
              <h2>Salão Short Hair</h2>
              <h5>Rua dos bobos - 0</h5>
            </div>
          </div>
          <label className={styles.likes}>
            <AiFillHeart color="#fff" size={25} />
            <span>300</span>
          </label>
        </div>
        <select
          value={categorySelected}
          onChange={handleChangeCategory}
          className={styles.select}
        >
          <option value="" selected disabled>
            Editar categoria
          </option>
          {categories.map((item, index) => {
            return (
              <option key={item.id} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div className={styles.menuServices}>
          <div className={styles.addService}>
            <div className={styles.plusDiv}>
              <BsPlusLg color="#e83f5b" size={80} />
            </div>
            <span>Adicionar novo serviço</span>
          </div>
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          <ServiceCard name="Nome do serviço" />
          {/* {services.map((item, index) => ())}  */}
        </div>
        <div className={styles.menuTime}>
          <h2>Horário de Abertura e Fechamento</h2>
          <div className={styles.timesDiv}>
            <div className={styles.time}>
              <div className={styles.timeLeft}>
                <h3>Abertura</h3>
                <p>8:00h</p>
              </div>
              <div className={styles.Rigth}>
                <CiUnlock color="#fff" size={50} />
              </div>
            </div>
            <div className={styles.time}>
              <div className={styles.timeLeft}>
                <h3>Fechamento</h3>
                <p>17:00h</p>
              </div>
              <div className={styles.Rigth}>
                <CiLock color="#fff" size={50} />
              </div>
            </div>
          </div>
        </div>
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
