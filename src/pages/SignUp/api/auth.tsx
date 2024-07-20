import axios from "axios";

const API = "http://localhost:4000/api/auth/register"


export const registerRequest = async (email: string, password: string) => {
    const response = await axios.post(API, { email, password });
    return response.data;
}