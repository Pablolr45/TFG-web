import { Service } from "./Service";

export class AuthService extends Service {
  login(email: string, password : string) {
    return this.post("auth/login", { email, password });
  }
}
