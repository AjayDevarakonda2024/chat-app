import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import axios from "axios";
import Login from "./userDetails/Login";
import './Master.css'

const Master = ()=>{
    const navigate = useNavigate() 
    const [userName, setUserName] = useState("")
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(localStorage.getItem("username")){
            const username = localStorage.getItem("username")
            const verrifiy = async ()=>{
                const res = await axios.get(
                    "https://chat-app-usernames.onrender.com/users"
                )
                let {data} = res
                setUserData(data)
                console.log("db data name is :",data[0].user)
                const exists = data.some((element)=>element.user === username)
                if(exists){
                    console.log("name is : ", username)
                    navigate("/app")
                }
                else{
                    console.log("No name")
                    navigate("/login")
                }
            }
            verrifiy()
        }
        else{
            navigate("/login")
        }
    },[userName])
    return(
        <>
        <div className={loading? "loading1": "loading2"}>
          <p>Loading..</p>
        </div>
        <Routes>
            <Route path="/app/*" element={<App setLoading={setLoading}></App>}></Route>
            <Route path="/login" element={<Login userName = {userName} setUserName={setUserName}></Login>}></Route>

        </Routes>
        </>
    )
}

export default Master;