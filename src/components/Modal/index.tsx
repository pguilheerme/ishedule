import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import cameraAdd from '../../../public/cameraAdd.svg'
import pencil from '../../../public/pencilWhite.svg'
import { firebase } from '@/services/firebase';
import { getDownloadURL } from 'firebase/storage'
import { api } from '@/services/apiClient';
import { parseCookies } from 'nookies';
import { AuthContext } from '@/contexts/AuthContext';
import  Router  from 'next/router';


type propsModal = {
    open: boolean,
    edit?: boolean,
    func?: {
        name: string,
        role: string,
        avatar_url: string
    },
    onClose: () => void,
}

export function BasicModal({ open, onClose, edit = false, func }: propsModal) {
    const { getDataCompany } = useContext(AuthContext)
    const { '@firebase.token': token } = parseCookies();
    const [funcName, setFuncName] = useState<string>()
    const [funcRole, setFuncRole] = useState<string>()
    const [imageAvatar, setImageAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        if (func) {
            setAvatarUrl(func.avatar_url)
            setFuncName(func.name)
            setFuncRole(func.role)
        }
    }, [onClose])

    async function uploadAvatar(image: File) {

        try {
            const randomId = Math.floor(Math.random() * 99999999 + 1);

            const storageRef = firebase.storage().ref().child(`avatarProfessionals/${randomId}-${image.name}`)
            const snapshot = await storageRef.put(image)

            const url = await getDownloadURL(snapshot.ref)
            return url

        } catch (error) {
            console.log(error)
            return false
        }
    }

    function handleAvatarFile(e) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleCreateProfessional = async (e) => {
        setDisabled(true)
        e.preventDefault()
        try {

            const avatarUrl = await uploadAvatar(imageAvatar)

            const response = await api.post('/professionals', {
                name: funcName,
                role: funcRole,
                avatar_url: avatarUrl 
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            
            getDataCompany()
            Router.push('/workers')
            setAvatarUrl('')
            setImageAvatar(null)
            setFuncName('')
            setFuncRole('')
            onClose()
        
        } catch (error) {
            console.log(error)
        } finally {
            setDisabled(false)
        }
    }

    const handleEditProfessional = async () => {
        const response = await api.patch('/professionals')
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
                        <div className={avatarUrl? styles.edit : styles.labelAvatar}>
                            <label htmlFor="inpAvatar">
                                <Image src={avatarUrl? pencil : cameraAdd} alt="Camera add icon" width={20} className={styles.image} />
                            </label>
                            <input
                                required
                                type="file"
                                id="inpAvatar"
                                accept="image/png, image/jpeg"
                                onChange={handleAvatarFile}
                            />

                            {avatarUrl && (
                                <Image
                                    src={avatarUrl}
                                    alt="Foto de perfil"
                                    width={50}
                                    height={50}
                                    className={styles.avatarPreview}
                                />
                            )}
                        </div>

                        <label>Nome</label>
                        <div className={styles.allInput}>
                            <input
                                required
                                type="text"
                                value={funcName}
                                onChange={(e) => setFuncName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <label>Cargo</label>
                        <div className={styles.allInput}>
                            <input
                                required
                                type='text'
                                value={funcRole}
                                onChange={(e) => setFuncRole(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.containerButtons}>
                            <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                            <button disabled={disabled} className={styles.btnConfirm} onClick={(e) => handleCreateProfessional(e)} >Concluído</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}