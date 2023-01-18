import { RootState } from 'store/store';
export const selectCurrentPost = (state: RootState) => state.post.currentPost;
