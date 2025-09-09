import { useEffect } from "react"
const You = ({setNavIcon})=>{
    useEffect(()=>{
            setNavIcon("you")
        },[])
    return(
        <>
        <h1>You Coming Soon</h1>
        </>
    )
}

export default You;