import Dialog from '@mui/material/Dialog';
import styles from './styles.module.scss'
import { api } from '@/services/apiClient';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type PropsDialog = {
    open: boolean,
    onClose: () => void
    id: string
}


export function DraggableDialog({ open, onClose, id }: PropsDialog) {
    const { getDataCompany } = useContext(AuthContext)
    const { '@firebase.token': token } = parseCookies();


    async function handleDeleteProfessional() {
        try {
            const response = await api.delete(`/professionals/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

            getDataCompany()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="draggable-dialog-title"
            >
                <div className={styles.dialogBody}>
                    <p>Tem certeza que deseja excluir esse membro?</p>
                </div>
                <div className={styles.containerButtons}>
                    <button className={styles.btnCancel} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.btnConfirm} onClick={handleDeleteProfessional}>
                        Sim, tenho
                    </button>
                </div>
            </Dialog>
        </ >
    );
}