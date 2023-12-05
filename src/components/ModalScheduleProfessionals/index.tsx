import styles from "./styles.module.scss"

type PropsModalScheduleProfessionals = {
    open: boolean,
    edit?: boolean,
    scheduleProfessionals?: [

    ]
    onClose: () => void
}

export function ModalScheduleProfessionals ({open, onClose, edit= false, scheduleProfessionals}: PropsModalScheduleProfessionals) {
    

    return(
        <>
        
        </>
    )
}