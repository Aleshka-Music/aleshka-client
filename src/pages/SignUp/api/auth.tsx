import axios from "axios";

const API = "http://localhost:4000/api/auth/register"


export const registerRequest = async (username: string, email: string, password: string, firstName: string, lastName: string, birthDate: Date) => {
    const response = await axios.post(API, { username, email, password, firstName, lastName, birthDate });
    return response.data;
}