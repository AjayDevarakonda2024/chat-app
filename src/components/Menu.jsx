import { useEffect } from "react";

const Menu = ({setNavIcon})=>{
    useEffect(()=>{
        setNavIcon("menu")
    },[])
    return(
        <>
        <h1>Menu Coming Soon</h1>
        </>
    )
}

export default Menu;