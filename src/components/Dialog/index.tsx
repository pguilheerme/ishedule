import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import styles from './styles.module.scss'

type PropsDialog = {
    open: boolean,
    onClose: () => void
}


export function DraggableDialog({ open, onClose }: PropsDialog) {

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
                    <button className={styles.btnConfirm}>
                        Sim, tenho
                    </button>
                </div>
            </Dialog>
        </ >
    );
}