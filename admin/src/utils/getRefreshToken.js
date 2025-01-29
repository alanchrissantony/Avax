export const getRefreshToken = async () => {
    const { store } = await import('@/store/store');
    const state = store.getState();
    
    return state.auth.refreshToken;
};