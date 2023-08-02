import axios from "axios";

const docURL =  `${process.env.REACT_APP_API_URL}/api/expenses/getreport`


export const getReport = async (month,token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }
    console.log("month : "+month);
    const response = await axios.post(docURL,{month}, config)
    return response.data
}

export default {getReport}