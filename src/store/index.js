import { configureStore } from '@reduxjs/toolkit'
import dateRangeSlice from './getDateRangeSlice'
import chatSlice from './getChartSlice'

export default configureStore({
    reducer: {
        chartData: chatSlice,
        dateData: dateRangeSlice,

    },
})