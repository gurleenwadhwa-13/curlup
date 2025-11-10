export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface IApiResponse {
  data: any
  status: number
  statusText: string
  responseTime: number
  responseSize: number
}

export interface IApiRequest {
  method: RequestMethods;
  url: string
  headers: Record<string, string | number>;
  body?: unknown;
  enabled?: boolean;
}


