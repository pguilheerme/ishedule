import styles from "./styles.module.scss";
import Image from "next/image";
import userShape from "../../../public/userShape.png";
import { LuCalendarClock, LuPencil, LuTrash2 } from "react-icons/lu";

export function WorkerCard({ avatar, name, role, color }) {
  return (
    <div className={styles.workerCard}>
      <div className={styles.workerContent}>
        {avatar ? (
          <Image
            src={avatar}
            alt="user"
            width={60}
            height={60}
            className={styles.workerAvatar}
          />
        ) : (
          <Image
            src={userShape}
            alt="user"
            width={60}
            height={60}
            className={styles.workerAvatar}
          />
        )}
        <div className={styles.workerInfo}>
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
      </div>

      <div className={styles.workerActions}>
        <LuCalendarClock color="#2F317C" size={30} cursor="pointer" />
        <LuPencil color="#2F317C" size={30} cursor="pointer" />
        <LuTrash2 color="#e83f5b" size={30} cursor="pointer" />
      </div>
    </div>
  );
}
