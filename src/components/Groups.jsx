import axios from "axios"
import { useEffect, useRef } from "react"
import './Groups.css'

const Groups = ({setNavIcon, token})=>{
    const ref1 = useRef(null)

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
                    "title": "New Message",
                    "body": "Ajay sent a message!"
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
        }
    }

    useEffect(()=>{
            setNavIcon("groups")
        },[])
    return(
        <>
        <div className="input">
            <input type="text" ref={ref1} placeholder="enter message.."></input> <button onClick={message}>send</button>
        </div>
        </>
    )
}

export default Groups;