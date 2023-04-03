import React from "react";
import {Chart} from "react-google-charts";

const PieChart = ({pieData}) => {
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height={"800px"}
            data={[["Advertiser ID", "Percentage"]].concat(pieData.map((data) => {
                return ([data.advertiserId, Number(data.CM001_percent)])
            }))}
            options={{
                // title: "My Daily Activities",
            }}
        />
    )
}
export default PieChart