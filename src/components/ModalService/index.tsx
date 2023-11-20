import Modal from '@mui/material/Modal'
import { AuthContext } from "@/contexts/AuthContext"
import { parseCookies } from "nookies"
import { useContext, useState } from "react"
import styles from './styles.module.scss'
import Image from 'next/image';


type propsModalService = {
    open: boolean,
    edit?: boolean,
    service?: {
        name: string,
        price: number,
        estimated_time: string,
        background_image_url: string,
    }
    onClose: () => void,
}

export function ModalService ({ open, onClose, edit = false, service }: propsModalService) {
    const { getDataCompany } = useContext(AuthContext)
    const { '@firebase.token': token } = parseCookies()
    const [serviceName, setServiceName] = useState<string>()
    const [imageAvatar, setImageAvatar] = useState(null)
    const [imageUrl, setImageUrl] = useState('')


    return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.containerCenter}>
                    <div className={styles.containerHeader}>
                        <p>{edit ? 'Editar': 'Adicionar novo'} serviço</p>
                    </div>
                    <div className={styles.containerForm}>
                        <form>
                            <div className={styles.containerForm}>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
    )
}