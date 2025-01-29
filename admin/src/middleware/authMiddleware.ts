import { RootState } from '@/store/store';
import { Middleware } from 'redux';

interface Action {
    type: string;
    payload?: any;
}

const authMiddleware: Middleware<{}, RootState> = store => next => (action: unknown) => {
    if (typeof action === 'object' && action !== null && 'type' in action) {
        const typedAction = action as Action;

        if (typedAction.type === 'auth/logout') {
            return next(action);
        }

        const state = store.getState();

        if (typedAction.type.startsWith('auth/') && !state.auth.accessToken) {
            store.dispatch({ type: 'auth/logout' });
            return;
        }
        return next(typedAction);
    }
    return next(action);
};


export default authMiddleware;