import axios from "axios";

let service = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 5000
})

//导出
export default service;