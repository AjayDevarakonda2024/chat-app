import { useEffect, useRef, useState } from "react";
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({userName, setUserName})=>{
    const navigate = useNavigate()
    let text = document.getElementsByClassName(".entername")
    const userref = useRef(null)
    const [error, setError] = useState("")
    const settingUser = ()=>{
        if(userref.current.value != ""){
            if(userref.current.value.includes(" ") || userref.current.value.length > 10){
                setError("please enter name without spaces and must be in 10 charecters")
            }
            else{
                    const username = localStorage.getItem("username")
                    const verrifiy = async ()=>{
                        const res = await axios.get(
                            "https://chat-app-usernames.onrender.com/users"
                        )
                        let {data} = res
                        console.log("db data name is :",data[0].user)
                        const exists = data.some((element)=>element.user === userref.current.value)
                        if(exists){
                            console.log("name is : ", username)
                            setError("Name already Exists")
                        }
                        else{
                            console.log("No name")
                            localStorage.setItem("username", userref.current.value)
                            setError("")
                            const setData = async()=>{
                                const res = await axios.post(
                                    "https://chat-app-usernames.onrender.com/users",
                                    {
                                        "user" : userref.current.value
                                    }
                                )
                            }
                            setData();
                            navigate("/app")
                        }
                    }
                    verrifiy()
            }
            

        }
        else{
            setError("Please Enter username")

        }
    }
    return(
        <div className="Login">
            <h1>WELCOME</h1>
        <div className="box">
            <h2>username</h2>
            <p className="entername">{error}</p>
            <input type="text" placeholder="username" ref={userref}></input>
            <button onClick={settingUser}>Confirm</button>
        </div>
        </div>
    )
}

export default Login;