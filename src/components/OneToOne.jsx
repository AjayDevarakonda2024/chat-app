import { useParams } from 'react-router-dom';
import './OneToOne.css'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const OneToOne = ()=>{
    const {username, token} = useParams()
    const msg = useRef()
    const name = localStorage.getItem("username")
    const [userMsg, setUserMsg] = useState([])
    const postmsgs = async ()=>{
        const res = await axios.post(
            "https://chat-app-onetoone.onrender.com/oneToOne",
            {
                "sender": localStorage.getItem("username"),
                "receiver": username,
                "sender_message": msg.current.value,
                "receiver_token": token
            }
        )
        msg.current.value = ""
    }

    const getmsgs = async ()=>{
        const res = await axios.get(
            "https://chat-app-onetoone.onrender.com/oneToOne",
        )
        console.log(res);
        let {data} = res
        setUserMsg(data)
    }

    const sendMsg = async()=>{
        const res = await axios.post(
            "https://chat-app-backend-2-hk56.onrender.com/notifications/send-to-user",
            
            {
            "token": token,
            "title": name,
            "body": msg.current.value
            }
        )
    }

    useEffect(()=>{
        getmsgs()
        const interval = setInterval(getmsgs, 3000) // fetch every 3s
        return () => clearInterval(interval)
    },[])
    return(
        <div className="oneToOne">
        <div className='oneToOne_chat'>
            <div className='oneToOne_name'>{username}</div>
            {
                userMsg.map((element, index)=>{
                    return(
                        name == element.sender && element.receiver == username || element.receiver == name && element.sender == username ? name == element.sender && element.receiver == username? (
                            <div key={index} className="user" >
                                <p><h5>{element.sender}</h5>{element.sender_message}</p>    
                            </div>
                        ):(
                            <div key={index} className="sender" >
                                <p><h5>{element.sender}</h5>{element.sender_message}</p>
                            </div>
                        ):""
                    )
                })
            }

        </div>
        <div className='oneToOne_message'>
            <input ref={msg} type='text' placeholder='enter message'></input>
            <button  onClick={()=>{postmsgs(), sendMsg()}}>send</button>
        </div>
        </div>
    )
}

export default OneToOne;