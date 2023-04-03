
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {apiCall, dateFormatter} from "../service";
import dayjs from "dayjs";

export const fetchDateRange = createAsyncThunk(
    "fetchDateRange",
    async (val,{getState}) => {
        // const {} = getState().apiParams
        try {
            const date = await apiCall({
                url: "https://sigviewauth.sigmoid.io/api/v1/getDateRange",
                method: "POST",
                payload: {
                    "organization": "DemoTest",
                    "view": "Auction"
                }
            })
            return date.result
        }
        catch (e){
            localStorage.clear()
            sessionStorage.clear()
            window.open("/login");
        }

    }
);
const getDateRangeSlice = createSlice({
    name: 'getDateRangeSlice',
    initialState: {
        dateRange: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDateRange.fulfilled, (state, action) => {
            let startDate =  dateFormatter(action.payload.startDate)
            let endDate = dateFormatter(action.payload.endDate)
            state.dateRange = [dayjs(startDate), dayjs(endDate)]
        })
    },

})
export default getDateRangeSlice.reducer