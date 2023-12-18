import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { firebase } from "@/services/firebase";
import { api } from "@/services/apiClient";
import { parseCookies } from "nookies";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CiLock, CiUnlock } from "react-icons/ci";

type PropsModalScheduleProfessionals = {
  id: string;
  open: boolean;
  edit?: boolean;
  scheduleProfessionals?: [enter_time: string, exit_time: string, weekdays: []];
  onClose: () => void;
};

export function ModalScheduleProfessionals({
  open,
  onClose,
  edit = false,
  scheduleProfessionals,
}: PropsModalScheduleProfessionals) {
  const [companyWeekdays, setCompanyWeekdays] = useState([]);
  const [companyEnterTime, setCompanyEnterTime] = useState("");
  const [companyExitTime, setCompanyExitTime] = useState("");

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  const [services, setServices] = useState([]);
  const [servicesDays, setServicesDays] = useState([
    { name: "dom", selected: true },
    { name: "seg", selected: false },
    { name: "ter", selected: false },
    { name: "qua", selected: false },
    { name: "qui", selected: false },
    { name: "sex", selected: false },
    { name: "sab", selected: false },
  ]);
  const [selected, setSelected] = useState(false);
  const [selectedDay, setselectedDay] = useState<string>("dom");
  const [weekDays, setWeekDays] = useState([
    {
      name: "dom",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "seg",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "ter",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "qua",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "qui",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "sex",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
    {
      name: "sab",
      checked: false,
      opening_time: dayjs(Date.now()),
      closing_time: dayjs(Date.now()),
    },
  ]);

  const setDate = (name: string) => {
    const day = weekDays.find((param) => param.name === name);
    return (
      <>
        <div className={styles.checkboxCompany}>
          <p className={ styles.textChecked}>
            trabalha
          </p>
          <button
            onClick={() => {
              const checkedDay = weekDays.map((param) => {
                if (param.name === name) {
                  return {
                    ...param,
                    checked: !param.checked,
                  };
                }
                return param;
              });
              setWeekDays(checkedDay);
            }}
            className={styles.btnChecked}
          >
            {day.checked ? (
              <FaRegCheckSquare size={25} />
            ) : (
              <FaRegSquare size={25} />
            )}
          </button>
        </div>
        <div className={styles.useHour}>
          <div className={styles.time}>
            <h3>Entrada</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={day.opening_time}
                onChange={(e) => {
                  const newOpeningTime = weekDays.map((param) => {
                    if (param.name === name) {
                      return {
                        ...param,
                        opening_time: e,
                      };
                    }
                    return param;
                  });
                  setWeekDays(newOpeningTime);
                }}
                className={styles.bgClock}
                ampm={false}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.time}>
            <h3>Saída</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={day.closing_time}
                onChange={(e) => {
                  const newClosingTime = weekDays.map((param) => {
                    if (param.name === name) {
                      return {
                        ...param,
                        closing_time: e,
                      };
                    }
                    return param;
                  });
                  setWeekDays(newClosingTime);
                }}
                ampm={false}
                className={styles.bgClock}
              />
            </LocalizationProvider>
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.containerCenter}>
        <div className={styles.containerHeader}>
          <p>Editar horários</p>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.weekDaysCheck}>
            {servicesDays.map((day) => {
              const dayName = day.name;
              return (
                <button
                  className={
                    day.selected
                      ? styles.containerCheckbox
                      : styles.containerCheckboxDisable
                  }
                  onClick={(e) => {
                    const changeDay = servicesDays.map((day) => {
                      e.preventDefault();
                      if (day.name === dayName) {
                        return { ...day, selected: true };
                      }
                      return { ...day, selected: false };
                    });
                    setServicesDays(changeDay);

                    setselectedDay(day.name);
                  }}
                >
                  <label htmlFor="dom">{day.name} </label>
                </button>
              );
            })}
          </div>
          {setDate(selectedDay)}
        </div>
      </div>
    </Modal>
  );
}
