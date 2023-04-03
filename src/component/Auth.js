import React, {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Auth =({children})=> {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("token") && !sessionStorage.getItem("token")){
            navigate("/login")
        }
    },[])

    return(
        <>{children}</>
    )
}
export default memo(Auth)