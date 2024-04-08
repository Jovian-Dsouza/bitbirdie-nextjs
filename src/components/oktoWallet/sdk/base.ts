// import fetch from "isomorphic-unfetch";

type Config = {
  clientApiKey: string;
  baseUrl: string;
};

export abstract class Base {
  private clientApiKey: string;
  private baseUrl: string;
  protected authToken: string = "";

  constructor(config: Config) {
    this.clientApiKey = config.clientApiKey;
    this.baseUrl = config.baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.clientApiKey,
      Authorization: `Bearer ${this.authToken}`,
    };

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }
}
