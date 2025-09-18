import { useEffect, useRef, useState } from "react"
import './You.css'
import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
const You = ({setNavIcon})=>{
    const [findName, setFindName] = useState([])
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const user = localStorage.getItem("username")
    const [msgData, setMsgData] = useState([])
    const userTokens = async()=>{
        const res = await axios.get(
            "https://chat-app-username-tokens-1.onrender.com/userTokens"

        )
        let {data} = res;
        console.log(data)
        setFindName(data)
    }

    const getmsgs = async ()=>{
        const res = await axios.get(
            "https://chat-app-onetoone.onrender.com/oneToOne",
        )
        console.log(res);
        let {data} = res
        setMsgData(data)
        
    }

    useEffect(()=>{
        getmsgs()
    },[])

    useEffect(()=>{
            setNavIcon("you")
            userTokens()
    },[])
    const filterdUsers = findName.filter((element)=>element.username.toLowerCase().includes(search.toLowerCase()))
    return(
        <div className="You">
            <div className="chat_list">
                {
                    msgData.map((element,index)=>{
                        return(
                            element.sender == user? <div key={index}><Link to={`single/${element.receiver}/${element.receiver_token}`} className="Link">{element.receiver}</Link></div>: ""
                        )
                    })
                }
                
            </div>
            <div className="search_user">
                <div className="search">
                    {search.length > 0 && filterdUsers.length > 0 ? (
                        filterdUsers.map((element, index)=>{
                            return(
                                <Link to={`single/${element.username}/${element.token}`} className="Link" key={index}>{element.username}</Link>
                            )
                        })): search.length > 0 && filterdUsers.length <= 0 ?<Link className="Link">user not found</Link>:""
                    }
                </div>
                <input type="text" placeholder="search user" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <button onClick={userTokens}>search</button>
            </div>
        </div>
    )
}

export default You;