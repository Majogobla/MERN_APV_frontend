import axios from "axios";

const clientaAxios = axios.create(
    {
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    }
);

export default clientaAxios;