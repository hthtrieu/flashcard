import { Request } from "express";
interface AuthRepositoryInterface {
    getUser: (username: String) => Promise<any>;
}
export default AuthRepositoryInterface;