export const getAccessToken = async () => {
    const { store } = await import('@/store/store');
    const state = store.getState();
    
    return state.auth.accessToken;
};