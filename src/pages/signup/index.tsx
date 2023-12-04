import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@/components/Ui/button'
import styles from '@/styles/Home.module.scss'
import { Input } from '@/components/Ui/input'
import { useState, FormEvent, useContext } from 'react'
import Link from 'next/link'
import googleIconImg from '../../../public/googleIconImg.svg'
import facebookIconImg from '../../../public/facebookIconImg.svg'
import { toast } from 'react-toastify'
import { AuthContext } from '@/contexts/AuthContext'

export default function SignUp() {
    const { signUpWithEmailAndPassword, signUpWithGoogle, signUpWithFacebook, user } = useContext(AuthContext)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function handleSignUpWithFacebook() {
        if (!user) {
            await signUpWithFacebook({
                ...form,
                name: form.name
            })
        }
    }

    async function handleSignUp(event: FormEvent) {
        event.preventDefault()

        if (form.name === '' || form.email === '' || form.password === '' || form.confirmPassword === '') {
            toast.warning("Preencha todos os campos")
            return
        }

        if (form.confirmPassword !== form.password) {
            toast.error("Erro ao cadastrar!")
            return
        }

        setLoading(true)

        let data = {
            ...form,
            name: form.name,
            email: form.email,
            password: form.password
        }

        await signUpWithEmailAndPassword(data)
        setLoading(false)
    }

    async function handleSignUpWithGoogle() {
        if (!user) {
            await signUpWithGoogle({
                ...form,
                name: form.name
            })
        }
    }

    return (
        <>
            <Head>
                <title>Crie sua conta | Ishedule</title>
            </Head>
            <h2>Cadastrar</h2>
            <form onSubmit={handleSignUp}>
                <label>Nome</label>
                <Input
                    withEye={false}
                    type='text'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label>Email</label>
                <Input
                    withEye={false}
                    type='text'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                /><label>Senha</label>
                <Input
                    withEye={true}
                    onShow={() => setShowPassword(!showPassword)}
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <label>Confirmar senha</label>
                <Input
                    withEye={true}
                    onShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <Button
                    type='submit'
                    loading={loading}
                >
                    Entrar
                </Button>
            </form>

            <div className={styles.lineGroup}>
                <div className={styles.line}></div>
                <p>
                    ou entrar com
                </p>
                <div className={styles.line}></div>
            </div>

            <div className={styles.buttonsLogin}>
                <button className={styles.btnGoogle} onClick={handleSignUpWithGoogle}>
                    <Image src={googleIconImg} alt="imagem do google" />
                </button>
                <button className={styles.btnFacebook} onClick={handleSignUpWithFacebook}>
                    <Image src={facebookIconImg} alt="imagem do facebook" />
                </button>
            </div>

            <Link href="/">
                <p className={styles.text}>Já possui uma conta? <strong>Entrar</strong></p>
            </Link>

        </>
    )
}
