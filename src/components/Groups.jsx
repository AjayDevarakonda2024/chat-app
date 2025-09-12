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
                    "title": "Ajay",
                    "body": ref1.current.value
                    },
                    {
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }

                )
                console.log(res.data)
                ref1.current.value = ""
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
        <div className="group">
            <div className="chat">
                <div className="user">
                    <p><h5>user</h5>emchesthunnav lorem*15</p>
                    
                </div>
                <div className="sender">
                    <p><h5>user</h5>Nothing..</p>
                </div>

                <div className="user">
                    <p><h5>user</h5>emchesthunnav lorem*15</p>
                    
                </div>
                <div className="sender">
                    <p><h5>user</h5>Nothing..</p>
                </div>

                
            </div>
            <div className="input">
                <input type="text" ref={ref1} placeholder="enter message.."></input> <button onClick={message}>send</button>
            </div>
        </div>
    )
}

export default Groups;