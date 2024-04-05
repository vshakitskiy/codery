import axios from "axios"

const pistonApi = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export default pistonApi