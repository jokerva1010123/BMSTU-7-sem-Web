import { ApiClient } from "./http";

class RoomSetting {
  public httpClient: ApiClient;
  constructor() {
    this.httpClient = new ApiClient();
  }

  url() {
    return "/Rooms";
    throw new Error("You have to implement the method url!");
  }

  async getListRom(query = {}, headers = {}) {
    try {
      // query.include = query.include ? query.include : [];
      // query.include.push("permissions");
      const response = await this.httpClient.get(this.url(), {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async getRoomId(id: any, query: any, headers = {}) {
    try {
      query.include = query.include ? query.include : [];
      query.include.push("permissions");
      const response = await this.httpClient.get(this.url() + "/" + id, {
        params: query,
        headers: headers,
      });
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

export default RoomSetting;
