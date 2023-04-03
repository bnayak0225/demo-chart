import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid, Typography,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import Loading from "./Loading";
import {useDispatch, useSelector} from "react-redux";
import {fetchDateRange} from "./../store/getDateRangeSlice";
import {fetchChart} from "../store/getChartSlice";
import TableChart from "./Table";
import BarChart from "./Bar";
import PieChart from "./Pie";
import {useNavigate} from "react-router-dom";
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import {getUTC} from "../service";
dayjs.extend(utc)
const Dashboard = () => {
    const [date, setDate] = useState([])
    const [prevDate, setPrevDate] = useState([])
    const [calenderClosed, setCalenderClosed] = useState(true)

    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)
    const [showDashboard, setShowDashboard] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {dateData: {dateRange}, chartData: {chartDetail, isLoading}} = useSelector(state=> state)
    useEffect(()=> {
        dispatch(fetchDateRange())
    },[])

    useEffect(()=>{
        if(dateRange[1]){
            setMaxDate(dateRange[1])
            setMinDate(dateRange[0])
            setDate(dateRange)
        }
    }, [dateRange])

    useEffect(()=> {
        if(calenderClosed === true && date.length > 0 &&
            (!prevDate[0] || getUTC(date[0]) !== getUTC(prevDate[0]) || getUTC(date[1]) !== getUTC(prevDate[1]))
        ){
            setPrevDate(date)
            dispatch(fetchChart(date))
        }
    }, [date, calenderClosed])

    return(
        <>
            <nav style={{padding: "20px 0 20px", background: "#fff", textAlign: "right"}}>
                <Container>
                    <span onClick={()=> {
                        localStorage.clear()
                        sessionStorage.clear()
                        navigate("/login")
                    }}>Logout</span>
                </Container>
            </nav>
            <div style={{paddingTop: "40px"}}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {minDate && maxDate &&
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4" component="h4" className={"header"}>
                                            Select date
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateRangePicker
                                                    disableFuture={false}
                                                    value={date}
                                                    localeText={{start: 'Check-in', end: 'Check-out'}}
                                                    maxDate={maxDate}
                                                    minDate={minDate}
                                                    onChange={(value)=> {
                                                        setDate(value)
                                                    }}
                                                    onOpen={()=> setCalenderClosed(false)}
                                                    onClose={()=> setCalenderClosed(true)}
                                                />
                                        </LocalizationProvider>
                                    </CardContent>
                                </Card>
                            }
                        </Grid>
                        {!showDashboard && <Grid item xs={12} align={"center"} style={{padding: "50px 0 50px 0"}}>
                            <Button color={"primary"} variant="outlined" onClick={()=>setShowDashboard(true)}>
                                View Dashboard
                            </Button>
                        </Grid>}
                        {showDashboard &&
                            <>
                                {chartDetail.tableData && <Grid item xs={12}>
                                    <Card>
                                        <CardContent style={{maxHeight: "700px", overflowY: "scroll"}} >
                                            <Typography variant="h4" component="h4" className={"header"}>
                                                Table Data
                                            </Typography>
                                            <TableChart tableData={chartDetail.tableData}/>
                                        </CardContent>
                                    </Card>
                                </Grid>}
                                {chartDetail.barData && <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h4" component="h4" className={"header"}>
                                                Bar Char
                                            </Typography>
                                            <BarChart barData={chartDetail.barData}/>
                                        </CardContent>
                                    </Card>
                                </Grid>}
                                {chartDetail.pieData && <Grid item xs={12}>
                                    <Card sx={{marginBottom: "40px"}}>
                                        <CardContent>
                                            <Typography variant="h4" component="h4" className={"header"}>
                                                Pie Chart
                                            </Typography>
                                            <PieChart pieData={chartDetail.pieData}/>
                                        </CardContent>
                                    </Card>
                                </Grid>}
                            </>
                        }
                    </Grid>

                </Container>
                {isLoading && <Loading/>}
            </div>
        </>
    )
}
export default Dashboard