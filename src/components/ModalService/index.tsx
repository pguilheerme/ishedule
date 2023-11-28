import Modal from '@mui/material/Modal'
import { AuthContext } from "@/contexts/AuthContext"
import { parseCookies } from "nookies"
import { useContext, useState } from "react"
import styles from './styles.module.scss'
import Image from 'next/image'
import pencil from '../../../public/pencilWhite.svg'
import cameraAdd from '../../../public/cameraAdd.svg'
import { InputNumber } from 'primereact/inputnumber';
import { firebase } from '../../services/firebase'
import { getDownloadURL } from 'firebase/storage'
import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'


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
    const [serviceAvatar, setServiceAvatar] = useState(null)
    const [serviceUrl, setServiceUrl] = useState('')
    const [disabled, setDisabled] = useState(false);

    function handleServiceFile(e) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/jpg") {
            setServiceAvatar(image);
            setServiceUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function uploadServiceAvatar(image: File) {

        try {
            const randomId = Math.floor(Math.random() * 99999999 + 1);

            const storageRef = firebase.storage().ref().child(`serviceAvatar/${randomId}-${image.name}`)
            const snapshot = await storageRef.put(image)

            const url = await getDownloadURL(snapshot.ref)
            return url

        } catch (error) {
            console.log(error)
            return false
        }
    }

    const handleCreateService = async (e) => {
        setDisabled(true)
        e.preventDefault()
        try {
            
            const serviceUrl = await uploadServiceAvatar(serviceAvatar)

            const response = await api.post('/services-company', {
                name: serviceName,
                price: String(servicePrice),
                background_img_url: serviceUrl,
                estimated_time: serviceTime
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log(servicePrice)
            

            getDataCompany()
            setServiceUrl('')
            setServiceAvatar(null)
            setServiceName('')
            setServicePrice(null)
            onClose()

        } catch (error) {
            toast.error('Erro ao criar serviço')
            console.log(error)
        } finally {
            setDisabled(false)
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
                    <p>{edit ? 'Editar' : 'Adicionar novo'} serviço</p>
                </div>
                <div className={styles.containerForm}>
                    <form>
                        <div className={serviceUrl ? styles.editBanner : styles.labelBanner}>
                            <label htmlFor="inpServiceAvatar">
                                <Image src={serviceUrl ? pencil : cameraAdd} alt="Camera add icon" width={20} className={styles.image} />
                            </label>
                            <input
                                required
                                type="file"
                                id="inpServiceAvatar"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleServiceFile}
                            />

                            {serviceUrl && (
                                <Image
                                    src={serviceUrl}
                                    alt="Foto do serviço"
                                    width={50}
                                    height={50}
                                    className={styles.bannerPreview}
                                />
                            )}
                        </div>

                        <label className={styles.labelName}>Nome do serviço</label>
                        <div className={styles.allInput}>
                            <input
                                required
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.otherInputs}>
                            <div className={styles.price_input}>
                                <label>Preço</label>
                                <InputNumber
                                    required
                                    inputId='currency-brazil'
                                    value={servicePrice}
                                    onChange={(e) => setServicePrice(e.value)}
                                    mode="currency"
                                    currency='BRL'
                                    locale='pt-BR'
                                />
                            </div>
                            <div className={styles.time_input}>
                                <label>Tempo estimado</label>
                                <input
                                    required
                                    value={serviceTime}
                                    onChange={(e) => setServiceTime(e.target.value)}
                                    type="time"
                                />
                            </div>
                        </div>

                        <div className={styles.containerButtons}>
                            <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                            <button disabled={disabled} className={styles.btnConfirm} onClick={(e) => handleCreateService(e)} >Concluído</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}