import styles from "./styles.module.scss";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export function ServiceCard({name}) {
  return (
    <div className={styles.addService}>
      <button className={styles.editDiv}>
          <LuPencil color="#fff" size={40} />
      </button>
      <img src="https://fastly.picsum.photos/id/865/536/354.jpg?hmac=n_LVs-V-EPWf--0OsJIt41c5IPV_dgyBcXxOi1lh-BM" alt="" className={styles.imageService} />
      <span>{name}</span>
    </div>
  );
}
