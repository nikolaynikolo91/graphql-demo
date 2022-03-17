import { createSelector } from '@ngrx/store';

interface FeatureState {
  posts: [];
  pagination: {
    offset: number;
    limit: number;
  };
  course: {};
  updatedCourse: {};
}

export interface AppState {
  posts: FeatureState;
}

const selectFeature = (state: AppState) => state.posts;

export const postsSelector = createSelector(
  selectFeature,
  (state: FeatureState) => state.posts
);

export const paginationSelector = createSelector(
  selectFeature,
  (state: FeatureState) => state.pagination
);
export const courseSelector = createSelector(
  selectFeature,
  (state: FeatureState) => state.course
);
export const updatedCourseSelector = createSelector(
  selectFeature,
  (state: FeatureState) => state.updatedCourse
);
