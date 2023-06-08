import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}:${process.env.NEXT_PUBLIC_PORT}`,
});

export default axiosInstance;
