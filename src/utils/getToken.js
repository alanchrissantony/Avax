import { store } from '../reducer/store'

export const getAccessToken = ()=>{
    const state = store.getState()
    return state.auth.accessToken
}