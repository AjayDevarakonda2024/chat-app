import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { generateToken, messaging} from './notifications/firebase'
import { onMessage } from 'firebase/messaging'

function App() {
  const [token, setToken] = useState("")

  useEffect(()=>{
    const t = generateToken();
    setToken(t)
    onMessage(messaging, (payload)=>{
      console.log(payload);
    })
  },[])

  return (
    <>
      <p>{token}</p>
    </>
  )
}

export default App
