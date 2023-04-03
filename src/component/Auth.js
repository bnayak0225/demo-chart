import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Auth =({children})=> {
    const navigate = useNavigate();
    console.log(localStorage.getItem("login"));

    useEffect(()=>{
        console.log(localStorage.getItem("login"));
        if(!localStorage.getItem("token") && !sessionStorage.getItem("token")){
            navigate("/login")
        }
    },[])

    return(
        <>{children}</>
    )
}
export default Auth