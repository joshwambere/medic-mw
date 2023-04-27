import Axios from "axios";



type axiosRequest = {
 method: string;
 url: string;
 data: any;
 headers: any;
};

const SendRequest = async ({ url, method, data, headers }: axiosRequest) => {
 try {
  switch (method) {
   case "GET":
    return await Axios.get(url, { headers });
   case "POST":
    return await Axios.post(url, data, { headers });
   case "PUT":
    return await Axios.put(url, data, { headers });
   case "DELETE":
    return await Axios.delete(url, { headers });
   default:
    return await Axios.get(url, { headers });
  }
 } catch (error) {
   throw error.response;
 }
};

export default SendRequest;
