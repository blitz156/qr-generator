import ApiRequest from "./base";

export default class LoginService extends ApiRequest {
  authenticate(username, password) {
    return this.request(
      "post",
      "/api/seller/login/",
      {},
      { username, password }
    );
  }
}
