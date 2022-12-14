import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider, useSelector } from "react-redux"
import ScrollToTop from "../src/layout/ScrollToTop"
import { store } from "../src/store"
import "../styles/App.css"
import { getApps, getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import ModalManager from "../src/common/modals/ModalManager"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import UseRequireLogin from "../src/layout/UseRequireLogin"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_VALFIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_VALFIREBASE_AUTH_DOMAIN,
  databaseURL:
    "https://ikevo-b2296-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_VALFIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_VALFIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_VALFIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_VALFIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_VALFIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const firestore = getFirestore()
export const database = getDatabase(app)
export const storage = getStorage()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="maximum-scale=1.0, initial-scale=1.0, width=device-width"
          />
        </Head>
        <DefaultSeo
          defaultTitle="イケボことわざ"
          description=""
          openGraph={{
            type: "website",
            title: "イケボことわざ",
            description: "",
            site_name: "イケボことわざ",
            url: "",
            images: [
              {
                url: "icon.png",
                width: 400,
                height: 400,
                alt: "イケボことわざのアイコン",
                type: "image/png",
              },
            ],
          }}
        />

        <ScrollToTop />
        <UseRequireLogin />
        <ModalManager />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
