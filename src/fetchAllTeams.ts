import axios from "axios";
import { baseUrl } from "./Utils/baseURL";

export async function fetchAllTeams() {
    try {
        const reponse = await axios.get(`${baseUrl}/teams`);
        const result = reponse.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}
