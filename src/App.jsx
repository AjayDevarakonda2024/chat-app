import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { generateToken, messaging} from './notifications/firebase'
import { onMessage } from 'firebase/messaging'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
    generateToken();
    onMessage(messaging, (payload)=>{
      console.log(payload);
    })
  },[])

  return (
    <>
      <p>hello</p>
    </>
  )
}

export default App
