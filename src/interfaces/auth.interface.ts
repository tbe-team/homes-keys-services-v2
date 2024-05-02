export interface IAuthService {
  signIn(phonenumber: string, pass: string): void;
}
