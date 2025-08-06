export interface SignupDTO {
  full_name: string;
  username: string;
  password: string;
  email: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}
