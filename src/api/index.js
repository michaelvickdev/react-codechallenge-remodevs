import axios from "axios";

const request = axios.create({
  baseURL: "https://swapi.dev/api",
});

export default request;
