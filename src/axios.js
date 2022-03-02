import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://st-jude-management-system.herokuapp.com" ||
    "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
