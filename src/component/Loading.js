import React from "react"

const Loading = () => {
    return (
        <div style={{
            backgroundColor: "rgba(255,255,255,0.93)",
            height: "100vh", width: "100vw", position: "fixed",
            top: 0,
            left: 0,
            zIndex: 12,
            textAlign: "center",
            paddingTop: "30%"
        }}>Loading... </div>
    )
}
export default Loading