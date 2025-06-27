import ApiRequest from "./base";

export default class UserService extends ApiRequest {
  authenticate(username, password) {
    return this.request(
      "post",
      "/public-api/users/login/",
      {},
      { username, password }
    );
  }

  register(username, password) {
    return this.request(
      "post",
      "/public-api/users/register/",
      {},
      { username, password }
    );
  }

  getInfo() {
    return this.request("get", "/api/users/info/");
  }
}
