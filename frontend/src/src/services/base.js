import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

export default class ApiRequest {
  request(method, url, params, data) {
    const headers = {};
    if (Cookies.get("x_access_")) {
      headers.Authorization = `Token ${Cookies.get("x_access_")}`;
    }

    return axios({
      headers,
      method,
      url: `${BASE_URL}${url}`,
      params,
      data,
    }).catch((error) => {
      if (error.response.status === 401) {
        window.location = "/login/";
      } else {
        throw error;
      }
    });
  }
}
