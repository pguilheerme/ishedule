import { LayoutHeader } from '@/components/Header'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps, ...appProps }: AppProps) {

  const isLayoutNeeded = [`/` , `/signup`].includes(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? Layout : LayoutHeader;


  return (
    <AuthProvider>
      <LayoutComponent>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} pauseOnHover={false} />
      </LayoutComponent>
    </AuthProvider>
  )

}
