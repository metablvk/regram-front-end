import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { profileReducer } from './profile/profile.reducer';
export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
});
