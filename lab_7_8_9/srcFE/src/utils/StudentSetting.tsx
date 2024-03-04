import { ApiClient } from "./http";

class StudentSetting {
  public httpClient: ApiClient;
  constructor() {
    this.httpClient = new ApiClient();
  }

  url() {
    return "/Students";
    throw new Error("You have to implement the method url!");
  }

  async listStudents(query = {}, headers = {}) {
    try {
      const response = await this.httpClient.get(this.url(), {
        params: query,
        //headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async getStudentId(id: any, headers = {}) {
    try {
      console.log(this.url());
      const response = await this.httpClient.get(this.url() + "/" + id, {
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async createStudents(data: any, query = {}, headers = {}) {
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

  async changeStudentRoom(id: any, data: any, query = {}, headers = {}) {
    try {
      console.log(data);
      const response = await this.httpClient.patch(
        this.url() + "/changeRoom/" + id,
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
  async changeStudentGroup(id: any, data: any, query = {}, headers = {}) {
    try {
      const response = await this.httpClient.patch(
        this.url() + "/" + id,
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

export default StudentSetting;
