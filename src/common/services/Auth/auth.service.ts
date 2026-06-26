import type { User } from "@modules/auth/login/state/authSlice";


export type LoginPayload = {
    username: string,
    password: string
};

const checkValidCreds = (username: string, password: string): User | null => {
    if(username == "harshalgawde@gmail.com" && password == "admin@123"){
        const user: User = {
            username: "harshalgawde@gmail.com",
            id:1,
            name: "Harshal Gawde"
        };
        return user;
    } else return null; 
}

export class AuthService {
    handleLogin(payload: LoginPayload): Promise<User> {
        const user = checkValidCreds(payload.username, payload.password);
        if(user)
            return new Promise((resolve) => setTimeout(() => resolve(user), 2000));
        else return new Promise((res,reject) => setTimeout(() => reject(Error("Invalid Credentials")), 2000))
    }
}