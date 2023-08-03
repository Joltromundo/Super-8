import axios from "axios"

const api = axios.create({
 baseURL: "https://movieapi.myspacegarden.com",
})

export default api