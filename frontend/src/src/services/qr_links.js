import ApiRequest from "./base";

const BASE_PATH = "/api/qr/";

export default class QRLinkService extends ApiRequest {
  // Получить список QR-ссылок
  list(params) {
    return this.request("get", BASE_PATH, params);
  }

  // Получить одну QR-ссылку по id
  retrieve(id) {
    return this.request("get", `${BASE_PATH}${id}/`);
  }

  // Создать новую QR-ссылку
  create(data) {
    return this.request("post", BASE_PATH, undefined, data);
  }

  // Обновить QR-ссылку полностью
  update(id, data) {
    return this.request("put", `${BASE_PATH}${id}/`, undefined, data);
  }

  // Удалить QR-ссылку
  delete(id) {
    return this.request("delete", `${BASE_PATH}${id}/`);
  }
}