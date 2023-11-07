import styles from "./styles.module.scss";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export function ServiceCard({name}) {
  return (
    <div className={styles.addService}>
      <div className={styles.editDiv}>
        <LuPencil color="#fff" size={40} />
      </div>
      <Image src="" alt="" className={styles.imageService} />
      <span>{name}</span>
    </div>
  );
}
