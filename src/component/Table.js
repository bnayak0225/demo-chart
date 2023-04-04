import React, {memo, useEffect, useState} from "react"
import {
    Input,

    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
const TableChart = ({tableData}) => {
    const [newtableData, setNewtableData]=useState([])
    const [input, setInput] = useState("")

    useEffect(()=> {
        let date = [...tableData]
        date = date.sort((a, b)=> a.publisherId < b.publisherId ? -1 : 1)
        if(input){
            setNewtableData(date.filter(d=>(d.publisherId.toLowerCase().includes(input))))
        }
        else{
            setNewtableData(date)
        }
    }, [input])

    return (
        <>
            <Input value={input} onChange={(e)=> setInput(e.target.value)}/>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Publisher ID</TableCell>
                            <TableCell>Impression Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newtableData.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.publisherId}</TableCell>
                                <TableCell>{row.impressions_offered}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )

}
export default memo(TableChart)