import type { User } from "@modules/auth/login/state/authSlice";
import { DUMMY_USER_DETAILS } from "@/common/constants/constants";

export type LoginPayload = {
    username: string,
    password: string
};

const checkValidCreds = (username: string, password: string): User | null => {
    if(username == DUMMY_USER_DETAILS.username && password == DUMMY_USER_DETAILS.password){
        const user: User = {
            username: DUMMY_USER_DETAILS.username,
            id:1,
            name: DUMMY_USER_DETAILS.name
        };
        return user;
    } else return null; 
}

export class AuthService {
    handleLogin(payload: LoginPayload): Promise<User> {
        const user = checkValidCreds(payload.username, payload.password);
        if(user)
            return new Promise((resolve) => setTimeout(() => resolve(user), 2000));
        else return new Promise((_res,reject) => setTimeout(() => reject(Error("Invalid Credentials")), 2000))
    }
}