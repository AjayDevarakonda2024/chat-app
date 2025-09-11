import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../App";

const Master = ()=>{
    const navigate = useNavigate() 
    useEffect(()=>{
        navigate("/app")
    },[])
    return(
        <>
        <Routes>
            <Route path="/app/*" element={<App></App>}></Route>
            <Route></Route>

        </Routes>
        </>
    )
}

export default Master;