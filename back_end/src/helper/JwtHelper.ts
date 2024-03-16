import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const genAccessToken = (id: string, username: string): string => {
    const access_token = jwt.sign({
        id: id,
        username: username
    }, String(process.env.JWT_SECRET), {
        expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
        algorithm: "HS256"
    });
    return access_token;
}
export const genRefreshToken = (id: string, username: string): string => {
    const refresh_token = jwt.sign({
        id: id,
        username: username
    }, String(process.env.JWT_SECRET), {
        expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        algorithm: "HS256"
    });
    return refresh_token;
}
export const verifyToken = (token: string): any => {
    const data = jwt.verify(token, String(process.env.JWT_SECRET)) as { id: string, username: string };
    return data
}
