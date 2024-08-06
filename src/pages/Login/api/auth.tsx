import axios from "axios";

const API = "http://localhost:4000/api/auth/login"


export const loginRequest = async (identifier: string, password: string) => {
    const response = await axios.post(API, { identifier: identifier, password });
    return response.data;
}