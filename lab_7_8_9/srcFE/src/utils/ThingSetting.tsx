import { ApiClient } from "./http";

class ThingSetting {
  public httpClient: ApiClient;
  constructor() {
    this.httpClient = new ApiClient();
  }

  url() {
    return "/Things";
  }

  async listThing(query: any, headers = {}) {
    try {
       query.include = query.include ? query.include : [];
       query.include.push("permissions");
      let dataUser = localStorage.getItem("logiUser")?.toString();
      if(dataUser == "1")
        query = {
          "login": localStorage.getItem("username")?.toString(),
      };
      const response = await this.httpClient.get(this.url(), {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async getThingId(id: any, query: any, headers = {}) {
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
  async changeThingStudent(id: any, query: any, headers = {}) {
    try {
      query.include = query.include ? query.include : [];
      query.include.push("permissions");
      const response = await this.httpClient.patch(
        this.url() + "/changeStudent" + "/" + id,
        query,
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

  async changeThingRoom(id: any, query: any, headers = {}) {
    try {
      query.include = query.include ? query.include : [];
      query.include.push("permissions");
      const response = await this.httpClient.patch(
        this.url() + "/changeRoom/" + id, 
        query,
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

  async createThing(data: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.post(this.url(), data, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async update(id: any, data: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.put(this.url() + "/" + id, data, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async delete(id: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.delete(this.url() + "/" + id, {
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

export default ThingSetting;
