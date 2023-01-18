import { POST_ACTION_TYPES } from './post.types';
import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currentPost: null,
};

export const postReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case POST_ACTION_TYPES.SET_CURRENT_POST:
      return { ...state, currentPost: payload };
    default:
      return state;
  }
};
