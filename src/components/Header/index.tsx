import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logoImg.svg'

export function Header () {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <Link href="/dashboard">
                    <Image src={logoImg} alt='logo ishedule'/>
                </Link>

                <nav className={styles.navMenu}>
                    <Link href="/dashboard">
                        <p>Tela inicial</p>
                    </Link>
                    <Link href="/schedule">
                        <p>Agenda</p>
                    </Link>
                    <Link href="/workers">
                        <p>Profissionais</p>
                    </Link>
                    <Link href="/profile">
                        <p>Editar perfil</p>
                    </Link>
                </nav>

            </div>
        </header>
    )
}