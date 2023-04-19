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

  signUp<ParamType, responseType>(
    url: string,
    param?: ParamType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.instance.post(url, param);
  }
}