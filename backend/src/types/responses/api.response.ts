export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> extends BaseResponse {
  data?: T;
}

export interface LoginResponse extends BaseResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface RefreshToken extends BaseResponse {
  access_token: string;
}
