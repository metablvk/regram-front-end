import { POST_ACTION_TYPES } from './post.types';
import { createAction } from './../../utils/reducers/reducer.utils';

export const setCurrentPost = (post: any) =>
  createAction(POST_ACTION_TYPES.SET_CURRENT_POST, post);
