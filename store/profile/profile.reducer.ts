import { PROFILE_ACTION_TYPES } from './profile.types';
import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currentProfile: null,
};

export const profileReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ACTION_TYPES.SET_CURRENT_PROFILE:
      return { ...state, currentProfile: payload };
    default:
      return state;
  }
};
