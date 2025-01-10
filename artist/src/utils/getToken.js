export const getAccessToken = async () => {
    const { store } = await import('../reducer/store');
    const state = store.getState();
    return state.auth.accessToken;
};