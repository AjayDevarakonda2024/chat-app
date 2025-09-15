import { useEffect, useState } from 'react'
import './App.css'
import { generateToken, messaging} from './notifications/firebase'
import { onMessage } from 'firebase/messaging'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import You from './components/You'
import Groups from './components/Groups'
import Menu from './components/Menu'
import axios from 'axios'
import OneToOne from './components/OneToOne'

function App({setLoading}) {
  const [token, setToken] = useState("")
  const [navIcon, setNavIcon] = useState("groups")

  const savingToken = async (token)=>{
    console.log(token)
    const res = await axios.post(
      "https://chat-app-backend-2-hk56.onrender.com/notifications",
      {
        "token" : String(token)
      }
    )
    console.log(res.data)
  }

  useEffect(()=>{
    const fetchToken = async ()=>{
      const t = await generateToken();
      setToken(t)
      await savingToken(t)
    }

    fetchToken()
    
    onMessage(messaging, (payload)=>{
      console.log(payload);
    })
  },[])

  

  return (
    <>
      <div className='app'>
      <div className='header'>
        <img src='./whats app.png' ></img>
        <Link to="you" className={navIcon == "you"? "you1":"you2"} onClick={()=>setNavIcon("you")}><i className='fa fa-user'></i></Link>
        <Link to="." className={navIcon == "groups"? "you1":"you2"} onClick={()=>setNavIcon("groups")}><i className='fa fa-group'></i></Link>
        <Link to="menu" className={navIcon == "menu"? "you1":"you2"} onClick={()=>setNavIcon("menu")}><i className='fa fa-bars'></i></Link>
      </div>
        <div className='body'>
          <Routes>
            <Route path='you' element={<You setNavIcon={setNavIcon}></You>}></Route>
            <Route index element={<Groups setNavIcon={setNavIcon} token={token} setLoading={setLoading}></Groups>}></Route>
            <Route path='menu' element={<Menu setNavIcon={setNavIcon}></Menu>}></Route>
            <Route path="you/single" element={<OneToOne></OneToOne>}></Route>
          </Routes>
        </div>
        </div>
    </>
  )
}

export default App
