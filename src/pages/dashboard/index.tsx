import { useState, useEffect, useContext } from "react";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import styles from "./styles.module.scss";
import Head from "next/head";
import dayjs from "dayjs";
import {
  BiBulb,
  BiBookmark,
  BiBody,
  BiGroup,
  BiArrowToBottom,
} from "react-icons/bi";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Fev",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Abr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Mai",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Ago",
      uv: 3200,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Set",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Out",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Nov",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Dez",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
  ];

  const { user } = useContext(AuthContext);
  const [date, setDate] = useState<dayjs.Dayjs>();
  const [formatDate, setFormatDate] = useState("");

  useEffect(() => {
    let today = dayjs();
    handleFormatDate(today);
  }, []);

  function handleFormatDate(day) {
    setDate(day);
    const monthString = new Date(day.$d).toLocaleString("pt-br", {
      month: "long",
    });
    const dayString = new Date(day.$d).toLocaleString("pt-br", {
      day: "numeric",
    });
    const weekdayString = new Date(day.$d).toLocaleString("pt-br", {
      weekday: "long",
    });
    const upperMonth =
      monthString.charAt(0).toUpperCase() + monthString.slice(1);
    const upperWeekday =
      weekdayString.charAt(0).toUpperCase() + weekdayString.slice(1);

    setFormatDate(`${upperWeekday}, ${dayString} de ${upperMonth}`);
  }

  return (
    <>
      <Head>
        <title>Dashboard | Ischedule</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.containerHeader}>
          <h2 className={styles.scheduleTitle}>Agenda</h2>
          <p className={styles.dateForStatus}>{formatDate}</p>
        </div>
        <div className={styles.containerUp}>
          <div className={styles.box}>
            <div className={styles.circle}>
              <BiBulb size={40} />
            </div>
            <div className={styles.boxText}>
              <h2>317</h2>
              <h3>Média mensal</h3>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.circle}>
              <BiBookmark size={40} />
            </div>
            <div className={styles.boxText}>
              <h2>40</h2>
              <h3>Qtd. do mês</h3>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.circle}>
              <BiBody size={40} />
            </div>
            <div className={styles.boxText}>
              <h2>12</h2>
              <h3>Funcionários</h3>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.circle}>
              <BiGroup size={40} />
            </div>
            <div className={styles.boxText}>
              <h2>41</h2>
              <h3>Clientes atendidos</h3>
            </div>
          </div>
        </div>
        <div className={styles.containerDown}>
          <div className={styles.containerChart}>
            {/* gráfico */}
          </div>
          <div className={styles.containerList}>
            <div className={styles.listTitle}>
              <h3>Atendentes de hoje</h3>
            </div>
            {user?.professionals.length != 0 ? (
              user?.professionals.map((e, key) => {
                return (
                  <div className={styles.funcListToday} key={key}>
                    <p>{e.name}</p>
                  </div>
                );
              })
            ) : (
              <div className={styles.noFunc}>
                <p>Ainda não há funcionários registrados</p>
              </div>
            )}
          </div>
          <button className={styles.btnList}>
            <BiArrowToBottom size={30} color="#2F317C" />
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  return {
    props: {},
  };
});
