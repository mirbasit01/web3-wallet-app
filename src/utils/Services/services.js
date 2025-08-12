import axios from "axios"
import { APIURL } from "utils/ApiUrls"




export const SignupApI = async (data) => {
    try {
        const response = await axios.post(`${APIURL}/auth/signup`, data)
        return response
     }
    catch (error) {
        throw error; // let calling function handle it
    }

}