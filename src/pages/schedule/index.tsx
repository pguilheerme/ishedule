import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "dayjs/locale/pt-br"
import Head from "next/head"
import styles from "./styles.module.scss"
import { useState } from "react"
import dayjs from "dayjs"
import Image from "next/image"
import todayIcon from "../../../public/todayIcon.svg"
import searchIcon from "../../../public/searchIcon.svg"

export default function Schedule() {
    const [date, setDate] = useState<dayjs.Dayjs>()

    //console.log();

    return (
        <>
            <Head>
                <title>Agenda | Ischedule</title>
            </Head>
            <div className={styles.containerCenter}>
                <div className={styles.containerScheduleLeft}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="pt-br"
                    >
                        <button
                            className={styles.btnSchedule}
                            onClick={() => setDate(dayjs(new Date))}
                        >
                            <Image src={todayIcon} alt="today icon" width={20} />
                            Hoje
                        </button>

                        <StaticDatePicker
                            orientation="portrait"
                            openTo="day"
                            value={date}
                            onChange={(day: dayjs.Dayjs) => setDate(day)}
                            defaultValue={dayjs(date)}
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles.containerScheduleRight}>
                    <div className={styles.scheduleTop}>
                        <div className={styles.fixed}>
                            <h2 className={styles.scheduleTitle}>Agenda</h2>
                            <p className={styles.dateSchedule}>{dayjs(date).format('DD/MM/YYYY')}</p>
                        </div>
                        <button className={styles.btnSearch}>
                            <Image src={searchIcon} alt="icone search" className={styles.btnSearch} />
                        </button>
                    </div>
                    <hr className={styles.hr}/>
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