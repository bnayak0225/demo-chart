import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    CardContent, Checkbox,
    FormControl,
    FormGroup, Grid,
    Input,
    InputLabel,
    OutlinedInput, Radio,
    Typography
} from "@mui/material";
import {apiCall} from "../service";

const Login =()=> {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        email: "", password: "", rememberMe: false
    })
    useEffect(()=> {
        if(localStorage.getItem("token") || sessionStorage.getItem("token")){
            navigate("/")
        }
    }, [])


    const login = async ()=> {
        let payload = {
            email: inputValue.email,
            password: inputValue.password,
            rememberMe: inputValue.rememberMe
        }
        const res = await apiCall({
            url: "https://sigviewauth.sigmoid.io/signIn",
            method: "POST",
            payload
        })
        if(payload.rememberMe){
            localStorage.setItem("token", res.token)
        }
        else {
            sessionStorage.setItem("token", res.token)
        }
        navigate("/")
    }
    const getValue =(e)=> {
        console.log({[e.target.name]: e.target.value})
        setInputValue({...inputValue, [e.target.name]: e.target.type === "checkbox" ? e.target.checked: e.target.value})
    }
    console.log(inputValue);
    return(
        <>
            <Card variant="outlined" className={"login-card"}>
                <CardContent>
                    <Typography variant="h4" component="h4" className={"header"}>
                        Login
                    </Typography>
                    <form onSubmit={(e)=> {
                        e.preventDefault()
                        login()
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel>Email</InputLabel>
                                <Input
                                    fullWidth={true}
                                    size={"medium"}
                                    name={"email"}
                                    value={inputValue.email}
                                    onChange={e=>getValue(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Password</InputLabel>
                                <Input
                                    fullWidth
                                    size={"medium"}
                                    type={"password"}
                                    name="password"
                                    value={inputValue.password}
                                    onChange={e=>getValue(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    <Checkbox
                                        name={"rememberMe"}
                                        checked={inputValue.rememberMe}
                                        onChange={e=>getValue(e)}
                                    /> Remember
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Button size={"medium"} variant="contained" color={"primary"} type={"submit"} disableElevation>Submit</Button>

                            </Grid>
                        </Grid>



                    </form>

                </CardContent>
            </Card>
        </>
    )
}
export default Login