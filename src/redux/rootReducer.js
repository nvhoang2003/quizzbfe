import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import quizResultSlice from './slice/quizResult';
import dataReducer from './slice/data';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem(_key, value) {
        return Promise.resolve(value);
    },
    removeItem() {
        return Promise.resolve();
    },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['quizResult'],
};

// const productPersistConfig = {
//     key: 'product',
//     storage,
//     keyPrefix: 'redux-',
//     whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({
    quizResult: quizResultSlice,
    data: dataReducer
});

export { rootPersistConfig, rootReducer };