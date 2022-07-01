import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-forex.herokuapp.com/api/",
})

export default api;
