import { RegisterForm } from "@/types/RegisterForm";

export default class AuthService {
  static async Register(data: RegisterForm) {
    return await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  static async Login(data: { email: string; password: string }) {
    return await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}
