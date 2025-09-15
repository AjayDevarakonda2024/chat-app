import axios from "axios"
import { useEffect, useRef, useState } from "react"
import './Groups.css'

const Groups = ({setNavIcon, token, setLoading})=>{
    const [userMsg, setUserMsg] = useState([])
    const name = localStorage.getItem("username")
    const ref1 = useRef(null)
    const chatRef = useRef(null)

    const putmessage = async(usname, msg)=>{
        const res = await axios.post(
            "https://chat-app-user-messages.onrender.com/message",
            {
                "user": usname,
                "message" : msg
            }
        )
    }

    const message = async ()=>{
        if(ref1.current.value === ""){
            console.log("enter message")
            return;
        }
        else{
            try{
                const res = await axios.post(
                    "https://chat-app-backend-2-hk56.onrender.com/notifications/send-to-all",
                    {
                    "title": name,
                    "body": ref1.current.value
                    },
                    {
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }

                )
                console.log(res.data)
            }
            catch(err){
                console.log("error: ",err)
            }
            putmessage(name, ref1.current.value)
            ref1.current.value = ""
        }
    }

    useEffect(()=>{
            setNavIcon("groups")
            const usermessage = async()=>{
                const res = await axios.get(
                    "https://chat-app-user-messages.onrender.com/message"
                )
                let {data} = res
                console.log(data)
                setUserMsg(data)
                setLoading(false)
            }
            usermessage()

            const interval = setInterval(usermessage, 3000) // fetch every 3s

             return () => clearInterval(interval)
    },[])

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [userMsg]);


    return(
        <div className="group">
            <div className="chat">

                {
                    userMsg.map((element, index)=>{
                        return(
                            name == element.user ? (
                                <div key={index} className="user" >
                                    <p><h5>{element.user}</h5>{element.message}</p>
                                    
                                </div>
                            ):(
                                <div key={index} className="sender" >
                                    <p><h5>{element.user}</h5>{element.message}</p>
                                </div>
                            )
                        )
                    })
                }
                <div ref={chatRef} />

            </div>
            <div className="input">
                <input type="text" ref={ref1} placeholder="enter message.."></input> <button onClick={message}>send</button>
            </div>
        </div>
    )
}

export default Groups;