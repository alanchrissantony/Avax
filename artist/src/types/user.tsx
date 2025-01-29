export interface User {
    id: string;
    username: string;
    email: string;
}


export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    artist: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface RegisterData {
    email: string;
    password: string;
    otp: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface VerifyData {
    email: string;
    registered: boolean;
}

export interface ResetData {
    email: string;
    password: string;
    otp: string;
}