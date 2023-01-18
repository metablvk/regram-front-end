import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { profileReducer } from './profile/profile.reducer';
import { postReducer } from './post/post.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  post: postReducer,
});
