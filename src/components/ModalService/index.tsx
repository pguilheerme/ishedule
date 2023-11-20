import Modal from '@mui/material/Modal'
import { AuthContext } from "@/contexts/AuthContext"
import { parseCookies } from "nookies"
import { useContext, useState } from "react"
import styles from './styles.module.scss'
import Image from 'next/image'
import pencil from '../../../public/pencilWhite.svg'
import cameraAdd from '../../../public/cameraAdd.svg'
import { InputNumber } from 'primereact/inputnumber';




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

export function ModalService({ open, onClose, edit = false, service }: propsModalService) {
    const { getDataCompany } = useContext(AuthContext)
    const { '@firebase.token': token } = parseCookies()
    const [serviceName, setServiceName] = useState<string>()
    const [servicePrice, setServicePrice] = useState<number>()
    const [serviceTime, setServiceTime] = useState<string>()
    const [imageAvatar, setImageAvatar] = useState(null)
    const [bannerUrl, setImageUrl] = useState('')
    const [disabled, setDisabled] = useState(false);

    function handleBannerFile(e) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setImageAvatar(image);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    }


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.containerCenter}>
                <div className={styles.containerHeader}>
                    <p>{edit ? 'Editar' : 'Adicionar novo'} membro</p>
                </div>
                <div className={styles.containerForm}>
                    <form>
                        <div className={bannerUrl ? styles.edit : styles.labelAvatar}>
                            <label htmlFor="inpAvatar">
                                <Image src={bannerUrl ? pencil : cameraAdd} alt="Camera add icon" width={20} className={styles.image} />
                            </label>
                            <input
                                required
                                type="file"
                                id="inpAvatar"
                                accept="image/png, image/jpeg"
                                onChange={handleBannerFile}
                            />

                            {bannerUrl && (
                                <Image
                                    src={bannerUrl}
                                    alt="Foto de perfil"
                                    width={50}
                                    height={50}
                                    className={styles.avatarPreview}
                                />
                            )}
                        </div>

                        <label>Nome do serviço</label>
                        <div className={styles.allInput}>
                            <input
                                required
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <label>Preço</label>
                        <div className={styles.allInput}>
                            <InputNumber
                                inputId='currency-brazil'
                                value={servicePrice}
                                onChange={(e) => setServicePrice(e.value)}
                                mode="currency"
                                currency='BRL'
                                locale='pt-BR'
                                className={styles.input}
                            />
                        </div>
                        <label>Tempo estimado</label>
                        <div className={styles.allInput}>
                                <input
                                value={serviceTime}
                                onChange={(e) => setServiceTime(e.target.value)} 
                                type="time" 
                                />
                        </div>
                        <div className={styles.containerButtons}>
                            <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                            <button disabled={disabled} className={styles.btnConfirm}  >Concluído</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}