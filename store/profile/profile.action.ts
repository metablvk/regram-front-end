import { PROFILE_ACTION_TYPES } from './profile.types';
import { createAction } from './../../utils/reducers/reducer.utils';

export const setCurrentProfile = (profile: any) =>
  createAction(PROFILE_ACTION_TYPES.SET_CURRENT_PROFILE, profile);
