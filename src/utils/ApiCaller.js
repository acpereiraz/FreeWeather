import axios from "axios";

async function ApiCaller(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("API Call Error! " + error);
  }
}

export default ApiCaller;
