import axios from "axios";

const api = axios.create({
  baseURL:process.env.REACT_APP_BLOG_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;

