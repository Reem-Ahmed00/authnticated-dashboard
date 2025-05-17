import { configureStore, EnhancedStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './src/redux/slices/authSlice';
import postsReducer from './src/redux/slices/postsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export function createTestStore(preloadedState?: any): EnhancedStore {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
