import { RootState } from 'store/store';
export const selectCurrentProfile = (state: RootState) =>
  state.profile.currentProfile;
