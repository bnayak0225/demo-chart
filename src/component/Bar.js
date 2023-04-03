import React from "react"
import {Chart} from "react-google-charts";

const BarChart = ({barData}) => {
    return(
        <Chart
            chartType="Bar"
            width="100%"
            height={"900px"}
            data={[["App Site ID", "Impression Order"]].concat(barData.map((data) => {
                return ([data.appSiteId, data.impressions_offered])
            }))}
            options={{
                bars: "horizontal",
            }}
        />
    )
}
export default BarChart