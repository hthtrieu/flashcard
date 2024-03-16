import { Request } from "express";

interface UserServiceInterface {
    upload_avatar: (user: any, imagePath: string) => Promise<any>;
}
export = UserServiceInterface;