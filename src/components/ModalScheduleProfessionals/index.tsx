import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { firebase } from '@/services/firebase';
import { api } from '@/services/apiClient';
import { parseCookies } from 'nookies';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

type PropsModalScheduleProfessionals = {
    open: boolean,
    edit?: boolean,
    scheduleProfessionals?: [
        enter_time: string,
        exit_time: string,
        weekdays: []
    ]
    onClose: () => void
}

export function ModalScheduleProfessionals ({open, onClose, edit= false, scheduleProfessionals}: PropsModalScheduleProfessionals) {
    const [companyWeekdays , setCompanyWeekdays] = useState([])
    const [companyOpeningTime, setCompanyOpeningTime] = useState("")
    const [companyClosingTime, setCompanyClosingTime] = useState("")

    const [selectedWeekdays, setSelectedWeekdays] = useState([])
    const [enterTime, setEnterTime] = useState("")
    const [exitTime, setExitTime] = useState("")

    const [disabled, setDisabled] = useState(false);

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

                </div>
             </div>
        </Modal>
    )
}