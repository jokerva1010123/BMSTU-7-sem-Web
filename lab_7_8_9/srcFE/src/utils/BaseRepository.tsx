import { ApiClient } from "./http";

class BaseRepository {
  public httpClient: ApiClient;
  constructor() {
    this.httpClient = new ApiClient();
  }

  url() {
    // ex:
    // return '/me'
    throw new Error('You have to implement the method url!');
  }

  async list(query: any, headers = {}) {
    try {
      query.include = query.include ? query.include : [];
      query.include.push('permissions');
      const response = await this.httpClient.get(this.url(), {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async detail(id: any, query: any, headers = {}) {
    try {
      query.include = query.include ? query.include : [];
      query.include.push('permissions');
      const response = await this.httpClient.get(this.url() + '/' + id, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async create(data: any, query = {}, headers = {}) {
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
      const response = await this.httpClient.put(this.url() + '/' + id, data, {
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
      const response = await this.httpClient.delete(this.url() + '/' + id, {
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

export default BaseRepository;