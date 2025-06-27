import ApiRequest from "./base";

export default class QRLinkService extends ApiRequest {
  // Получить список QR-ссылок
  list(params) {
    return this.request("get", "/api/qr/", params);
  }

  // Получить одну QR-ссылку по id
  retrieve(id) {
    return this.request("get", `"/api/qr/"${id}/`);
  }

  // Создать новую QR-ссылку
  create(data) {
    return this.request("post", "/api/qr/", undefined, data);
  }

  // Обновить QR-ссылку полностью
  update(id, data) {
    return this.request("put", `"/api/qr/"${id}/`, undefined, data);
  }

  // Удалить QR-ссылку
  delete(id) {
    return this.request("delete", `"/api/qr/"${id}/`);
  }
}