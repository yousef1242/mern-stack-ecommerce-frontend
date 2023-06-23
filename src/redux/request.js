import axios from "axios"



const request = axios.create({
    baseURL : "https://mern-stack-ecommerce-backend.onrender.com"
})

export default request