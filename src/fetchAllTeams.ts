import axios from "axios";
import { baseUrl } from "./Utils/baseURL";

export async function fetchAllTeams() {
    try {
        const response = await axios.get(`${baseUrl}/teams`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}
