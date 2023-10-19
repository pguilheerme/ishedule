import { InputHTMLAttributes } from "react"
import styles from './styles.module.scss'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    withEye: boolean;
    onShow?: () => void
}

export function Input ({type = 'text', withEye = false, onShow,...rest}: InputProps) {

    return (
        <div className={styles.inputGroup}>
            <input className={styles.input} {...rest} type={type} />
            {withEye? type === 'password' ? <AiOutlineEye size={20} color='#C31C5A' onClick={onShow} cursor='pointer'/> : <AiOutlineEyeInvisible size={20} color='#C31C5A' onClick={onShow} cursor='pointer'/> : null}
        </div>
    )
}