import axios from "axios"

const instance = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export default instance