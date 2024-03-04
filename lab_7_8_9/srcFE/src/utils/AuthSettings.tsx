import { ApiClient } from "./http";

class AuthSettings {
  public httpClient: ApiClient;
  constructor() {
    this.httpClient = new ApiClient();
  }

  url() {
    return "";
  }

  async login(data: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.post(this.url() + "/login", data, {
        params: query,
        headers: headers,
      });

      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }
  async logout() {
    try {
      const response = await this.httpClient.get(this.url() + "/logout");
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }
  async changePass(id: any, data: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.patch(
        this.url() + "/changePassword/" + id,
        data,
        {
          params: query,
          headers: headers,
        }
      );
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }
  handlerHttpError(e: any) {

    if (e.response && e.response.data) {
      const errorMsg = e.message;
      return this.error(errorMsg);
    } else {
      throw e;
    }
  }
  success(data: any) {
    return { status: true, response: data };
  }
  error(error: any) {
    return { status: false, response: error };
  }
}

export default AuthSettings;
