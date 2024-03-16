import axios from "axios";
// const BASE_URL = process.env.REACT_APP_SERVER_URL;
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const TestAPI = async (data: any) => {
    // const response = await axios.post(`${BASE_URL}/authenticate`, JSON.stringify(data), config);
    // if (response.status === 200) {
    //     return {
    //         Data: response?.data
    //     }
    // }
    // else {
    //     return {
    //         Message: "Error"
    //     }
    // }
    return { message: "Hello World" };
}
