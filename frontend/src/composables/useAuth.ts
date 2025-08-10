import { toast } from "vue-sonner";

interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload {
  full_name: string;
  username: string;
  password: string;
  email: string;
}

export function useAuth() {
  const login = async (loginData: LoginPayload) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Logged in successfully!");
      return { success: true, result: result };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false };
    }
  };

  const signup = async (signupData: SignupPayload) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Your account has been created.");
      return { success: true, result: result };
    } catch (error) {
      toast.error(
        error.message ||
          "Signup failed due to invalid data. Please review your input and try again."
      );
      return { success: false };
    }
  };

  return { login, signup };
}
