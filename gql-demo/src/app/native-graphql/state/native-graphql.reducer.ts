import { createReducer, on } from '@ngrx/store';
import {
  fetchCourseSuccess,
  fetchPostSuccess,
  updateCourseTopicSuccess,
  updatePagination,
} from './native-graphql.actions';

const initialState: {
  posts: any[];
  pagination: {
    offset: number;
    limit: number;
  };
  course: any;
} = {
  posts: [],
  pagination: {
    offset: 0,
    limit: 2,
  },
  course: {},
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostSuccess, (state, action) => ({
    ...state,
    posts: [...state.posts, ...action.posts],
  })),
  on(updatePagination, (state, action) => ({
    ...state,
    pagination: { offset: action.offset, limit: action.limit },
  })),
  on(fetchCourseSuccess, (state, action) => ({
    ...state,
    course: { ...action.course },
  })),
  on(updateCourseTopicSuccess, (state, action) => ({
    ...state,
    updatedCourse: { ...action.updateCourse },
    posts: state.posts.map((obj) =>
      action.updateCourse.id === obj.id ? action.updateCourse : obj
    ),
    course:
      state.course.id === action.updateCourse.id
        ? action.updateCourse
        : state.course,
  }))
);
