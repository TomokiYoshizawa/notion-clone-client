import axios from "axios";

const BASE_URL = "https://notion-clone-server-09ad1a0815c4.herokuapp.com";
const getToke = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToke()}`,
      // this part connects with authorization header in server side
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);
export default axiosClient;
