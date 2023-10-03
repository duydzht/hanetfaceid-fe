import axios from "axios";
import qs from "qs";
import { STRAPI_ENDPOINT } from "./constants";

export const BASE_API_URL = `${STRAPI_ENDPOINT}/api`;

const client = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
});

const get = async ({ method, params = {} }) => {
  const query = qs.stringify(params, {
    encodeValuesOnly: true,
  });
  console.log("httpClient.get", query);
  try {
    const { data = {} } = (await client.get(`${method}?${query}`)) || {};
    return data;
  } catch (err) {
    return errorResponse(err);
  }
};

const post = async ({ method, body }) => {
  try {
    const { data = {} } = (await client.post(method, body)) || {};
    return data;
  } catch (err) {
    return errorResponse(err);
  }
};

const errorResponse = (error) => {
  console.log(`errorResponse: ${JSON.stringify(error)}`);
  throw error;
};

const HttpClient = {
  get,
  post,
};

export default HttpClient;
