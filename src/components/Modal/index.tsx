import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import cameraAdd from '../../../public/cameraAdd.svg'


type propsModal = {
    open: boolean,
    edit?: boolean,
    func?: {
        name: string,
        role: string
    },
    onClose: () => void,
}

export function BasicModal({ open, onClose, edit = false, func }: propsModal) {
    const [funcName, setFuncName] = useState<string>()
    const [funcRole, setFuncRole] = useState<string>()
    const [imageAvatar, setImageAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");



    useEffect(() => {
        if (func) {
            setFuncName(func.name)
            setFuncRole(func.role)
        }
    }, [onClose])

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
                        <div className={styles.labelAvatar}>
                            <label htmlFor="inpAvatar">
                                <Image src={cameraAdd} alt="Camera add icon" width={20} className={styles.image} />
                            </label>
                            <input
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
                                type="text"
                                value={funcName}
                                onChange={(e) => setFuncName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <label>Cargo</label>
                        <div className={styles.allInput}>
                            <input
                                type='text'
                                value={funcRole}
                                onChange={(e) => setFuncRole(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.containerButtons}>
                            <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                            <button className={styles.btnConfirm}>Concluído</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}