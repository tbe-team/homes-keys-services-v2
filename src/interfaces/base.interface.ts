export interface IBaseResponse<T> {
  data?: T;
  message: string;
  timestamp?: string;
  path?: string;
  statusCode: number;
  error?: boolean;
  errors?: IBaseErrorResponse[];
}

export interface IBaseErrorResponse {
  errorCode: string;
  errorMessage: string;
}
