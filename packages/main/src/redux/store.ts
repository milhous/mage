import { createStore, compose } from 'redux';
import rootReducer from './reducers';

import type { AppState } from './modules/app';

export type RootState = {
    app: AppState;
};

export default function configureStore() {
    const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, storeEnhancers());
}
