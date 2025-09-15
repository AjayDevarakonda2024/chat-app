import { useEffect, useRef, useState } from "react"
import './You.css'
import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
const You = ({setNavIcon})=>{
    const name = useRef(null)
    const [findName, setFindName] = useState([])
    const navigate = useNavigate()
    const user = localStorage.getItem("username")
    const userTokens = async()=>{
        const res = await axios.get(
            "https://chat-app-username-tokens-1.onrender.com/userTokens"

        )
        let {data} = res;
        console.log(data)
        setFindName(data)
    }
    useEffect(()=>{
            setNavIcon("you")
        },[])
    return(
        <div className="You">
            <div className="chat_list">
                {
                    findName.filter((element)=>element.username.toLowerCase().includes(name.current.value.toLowerCase())).map((element, index)=>{
                        return(
                            <Link to="single" className="Link" key={index}>{element.username}</Link>
                        )
                    })
                }
            </div>
            <div className="search_user">
                <input type="text" placeholder="search user" ref={name}></input>
                <button onClick={userTokens}>search</button>
            </div>
        
        </div>
    )
}

export default You;