import axios from "axios";
import { API_URL } from "@env";

const client = axios.create();

// client.defaults.baseURL = `${API_URL}/api/v1/`
client.defaults.baseURL = `http://13.124.254.217:8080/api/v1/`

export default client;
