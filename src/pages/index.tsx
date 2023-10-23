import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@/components/Ui/button'
import styles from '@/styles/Home.module.scss'
import { Input } from '@/components/Ui/input'
import { useState, FormEvent, useContext } from 'react'
import Link from 'next/link'
import LoginImg from '../../public/loginImg.svg'
import googleIconImg from '../../public/googleIconImg.svg'
import facebookIconImg from '../../public/facebookIconImg.svg'
import { toast } from 'react-toastify'
import { AuthContext, } from '@/contexts/AuthContext'
import { canSSRGuest } from '@/utils/canSSRGuest'



export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if(userName === "" || password === ""){
        toast.warning("Preencha todos os campos")
        return 
    }

    setLoading(true)

    let data = {
       userName,
       password
    }

    await signIn(data)

    setLoading(false)
}


  return (
        <>
          <h2>Entrar</h2>
          <form onSubmit={handleLogin}>
            <label>Email ou Telefone</label>
            <Input
            withEye={false}
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Senha</label>
            <Input
              withEye={true}
              onShow={() => setShowPassword(!showPassword)}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              loading= {loading}
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
              <button className={styles.btnGoogle}>
                <Image src={googleIconImg} alt="imagem do google"/>
              </button>
              <button className={styles.btnFacebook}>
                <Image src={facebookIconImg} alt="imagem do facebook"/>
              </button>
            </div>

            <Link href="/signup">
              <p className={styles.text}>Não possui uma conta? <strong>Cadastre-se</strong></p>
            </Link>

        </>
  )
}

// export const getServerSideProps = canSSRGuest(async (ctx) => {
    
//   return {
//       props: {}
//   }
// })