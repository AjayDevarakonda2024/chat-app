import { useEffect } from "react"
import './You.css'
const You = ({setNavIcon})=>{
    useEffect(()=>{
            setNavIcon("you")
        },[])
    return(
        <div className="You">
        <h1>You Coming Soon</h1>
        </div>
    )
}

export default You;