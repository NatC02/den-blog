import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import toast from "react-hot-toast"

export default function Home() {
  return (
    <div>
      <h1>Home, Welcome</h1>
      <button onClick={() => toast.success('Testing some toast msg')}>
        Toast Test 
      </button>
    </div>
  )
}
