import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';


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
    useEffect(() => {
        if (func) {
            setFuncName(func.name)
            setFuncRole(func.role)
        }
    },[onClose])

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.containerCenter}>
                <div className={styles.containerHeader}>
                    <p>{edit ?  'Editar' :'Adicionar novo'} membro</p>
                </div>
                <div className={styles.containerForm}>
                    <form>
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