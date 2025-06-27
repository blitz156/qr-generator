import ApiRequest from "./base";

export default class LoginService extends ApiRequest {
  authenticate(username, password) {
    return this.request(
      "post",
      "/public-api/login/",
      {},
      { username, password }
    );
  }
}
