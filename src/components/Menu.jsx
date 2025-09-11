import { useEffect } from "react";
import './Menu.css'

const Menu = ({setNavIcon})=>{
    useEffect(()=>{
        setNavIcon("menu")
    },[])
    return(
        <div className="Menu">
        <h1>Menu Coming Soon</h1>
        </div>
    )
}

export default Menu;