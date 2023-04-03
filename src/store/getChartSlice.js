
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiCall, getUTC} from "../service";

export const fetchChart = createAsyncThunk(
    "fetchChart",
    async (date) => {
        // const {date} = getState().apiParams
        let chartData = {}
        try {
            let tableData = await apiCall({url: "https://sigviewauth.sigmoid.io/api/v1/getData",
                method: "post",
                payload: {
                    "_id": "dashboard1516252439345",
                    "emailId": "candidate@sigmoid.com",
                    "orgViewReq": {
                        "organization": "DemoTest",
                        "view": "Auction"
                    },
                    "chartObject": {
                        "metadata": {
                            "title": "chartobject:1516252439345",
                            "img_thumbnail": "../img/chart.png",
                            "chartType": "table",
                            "dataLimit": 50
                        },
                        "requestParam": {
                            "granularity": "hour",
                            "timeZone": {
                                "name": "UTC (+00:00)",
                                "location": "UTC"
                            },
                            "dateRange": {
                                "startDate": getUTC(date[0]).toString(),
                                "endDate": getUTC(date[1]).toString()
                            },
                            "xAxis": [
                                "D044"
                            ],
                            "yAxis": [
                                "M002"
                            ],
                            "approxCountDistinct": [],
                            "specialCalculation": [],
                            "filter": [],
                            "orderBy": {
                                "metricOrdByList": [
                                    {
                                        "id": "M002",
                                        "desc": true
                                    }
                                ]
                            },
                            "percentCalList": []
                        }
                    }
                }
            })
            let barData = await apiCall({
                url: "https://sigviewauth.sigmoid.io/api/v1/getData",
                method: "POST",
                payload: {
                    "_id": "dashboard1516252235693",
                    "emailId": "candidate@sigmoid.com",
                    "orgViewReq": {
                        "organization": "DemoTest",
                        "view": "Auction"
                    },
                    "chartObject": {
                        "metadata": {
                            "title": "chartobject:1516252235693",
                            "img_thumbnail": "../img/chart.png",
                            "chartType": "bar",
                            "dataLimit": 50
                        },
                        "requestParam": {
                            "granularity": "hour",
                            "timeZone": {
                                "name": "UTC (+00:00)",
                                "location": "UTC"
                            },
                            "dateRange": {
                                "startDate": getUTC(date[0]).toString(),
                                "endDate": getUTC(date[1]).toString()
                            },
                            "xAxis": [
                                "D017"
                            ],
                            "yAxis": [
                                "M002"
                            ],
                            "approxCountDistinct": [],
                            "specialCalculation": [],
                            "filter": [],
                            "orderBy": {
                                "metricOrdByList": [
                                    {
                                        "id": "M002",
                                        "desc": true
                                    }
                                ]
                            },
                            "percentCalList": []
                        }
                    }
                }
            })
            let pieData = await apiCall({
                url: "https://sigviewauth.sigmoid.io/api/v1/getData",
                method: "POST",
                payload: {
                    "_id": "Datastory_ChartId_1535224664111",
                    "emailId": "candidate@sigmoid.com",
                    "orgViewReq": {
                        "organization": "DemoTest",
                        "view": "Auction"
                    },
                    "chartObject": {
                        "metadata": {
                            "title": "",
                            "img_thumbnail": "images/pie.png",
                            "chartType": "pie",
                            "dataLimit": 500
                        },
                        "text": [],
                        "requestParam": {
                            "granularity": "hour",
                            "timeZone": {
                                "name": "UTC (+00:00)",
                                "location": "UTC"
                            },
                            "dateRange": {
                                "startDate": getUTC(date[0]).toString(),
                                "endDate": getUTC(date[1]).toString()
                            },
                            "xAxis": [
                                "D005"
                            ],
                            "yAxis": [],
                            "approxCountDistinct": [],
                            "specialCalculation": [
                                "CM001"
                            ],
                            "filter": [],
                            "orderBy": {
                                "customMetricOrdByList": [
                                    {
                                        "id": "CM001",
                                        "desc": true
                                    }
                                ]
                            },
                            "percentCalList": [
                                {
                                    "id": "CM001"
                                }
                            ]
                        }
                    }
                }
            })

            chartData = {tableData: tableData.result.data, barData: barData.result.data, pieData: pieData.result.data}
            return chartData
        }
        catch(e)
        {
            localStorage.clear()
            sessionStorage.clear()
            window.open("/login");
        }

    }
);
const getChartSlice = createSlice({
    name: 'getChartSlice',
    initialState: {
        chartDetail: {},
        isLoading: true
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchChart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chartDetail = action.payload
        })
    },

})
export default getChartSlice.reducer