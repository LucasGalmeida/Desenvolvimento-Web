import { createStore } from 'redux';
import Reducers from './reducers/index';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistedReducer = persistReducer({
        key:'rootEventos',
        storage:storage,
        stateReconciler: hardSet,
        whitelist:['user']
    },Reducers);

    const store = createStore(persistedReducer);
    
    let persistor = persistStore(store);

export {store, persistor}