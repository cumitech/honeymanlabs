import { AuthRepository, type RegisterData } from "./auth.repository";
export type LoginData = {
    email: string;
    password: string;
};
export declare class AuthService {
    private readonly repo;
    constructor(repo: AuthRepository);
    register(data: RegisterData): Promise<{
        token: string;
    }>;
    login(data: LoginData): Promise<{
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map