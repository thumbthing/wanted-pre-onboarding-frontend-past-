import axios, { AxiosInstance, AxiosResponse } from "axios";

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://www.pre-onboarding-selection-task.shop",
      headers: {
        "Content-Type": 'application/json',
      },
      transformResponse: response => {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      },
      responseType: 'json',
    })
  }

  sign<ParamType, ResponseType>(
    url: string,
    param?: ParamType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.instance.post(url, param);
  }

  createTodo<ParamType, ResponseType>(
    url: string,
    param?: ParamType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.instance.post(url, param, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": 'application/json',
      },
    });
  }

}

export const request = new Api();