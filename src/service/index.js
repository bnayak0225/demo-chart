const apiCall = async ({url, method, payload, header={}}) => {
    const xAuthToken = localStorage.getItem("token") || sessionStorage.getItem("token")
    let res = await fetch(url, {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": xAuthToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload)
    })
    res =  await res.json()
    return res
}
const dateFormatter = (value) => {
    let date = new Date(Number(value))
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
const getUTC = (date) => {
    let utcOffset = new Date().getTimezoneOffset();
    return Date.parse(new Date(`${date["$y"]}-${date["$M"]+1}-${date["$D"]}`)) +  (utcOffset * 60000)
}
export {apiCall, dateFormatter, getUTC}