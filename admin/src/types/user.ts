export interface User {
    id: string;
    username: string;
    email: string;
}


export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    admin: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface LoginData {
    email: string;
    password: string;
}