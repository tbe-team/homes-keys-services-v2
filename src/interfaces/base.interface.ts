export interface IBaseResponse<T> {
  data?: T;
  message: string;
  timestamp?: string;
  path?: string;
  statusCode: number;
  error: boolean;
  errors?: IBaseErrorResponse[];
  method?: string;
}

export interface IBaseErrorResponse {
  errorCode: number;
  errorMessage: string;
}
