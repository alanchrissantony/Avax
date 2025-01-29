import { setAccessToken } from '@/slices/authSlice';

export const setToken = async (access: string) => {
    const { store } = await import('@/store/store');
    store.dispatch(setAccessToken(access));
    return
};