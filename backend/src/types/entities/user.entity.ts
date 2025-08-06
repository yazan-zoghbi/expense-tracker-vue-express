export interface User extends Document {
  full_name: string;
  username: string;
  email: string;
  password: string;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}
