import { createAction, props } from '@ngrx/store';

enum ActionTypes {
  FETCH_POST_TRY = '[POST] Try fetch post data',
  FETCH_POST_SUCCESS = '[POST] Success post data',
  FETCH_POST_FAIL = '[POST] Fail post data',
  UPDATE_PAGINATION = '[POST] Update pagination',

  FETCH_COURSE_TRY = '[COURSE] Try fetch course data',
  FETCH_COURSE_SUCCESS = '[COURSE] Success course data',
  FETCH_COURSE_FAIL = '[COURSE] Fail course data',

  UPDATA_COURSE_TOPIC_TRY = '[COURSE] Update course data',
  UPDATA_COURSE_TOPIC_SUCCESS = '[COURSE] Course update success',
}

export const fetchPostTry = createAction(ActionTypes.FETCH_POST_TRY);

export const fetchPostSuccess = createAction(
  ActionTypes.FETCH_POST_SUCCESS,
  props<{ posts: any[] }>()
);

export const fetchPostFail = createAction(
  ActionTypes.FETCH_POST_FAIL,
  props<any>()
);

export const updatePagination = createAction(
  ActionTypes.UPDATE_PAGINATION,
  props<{ offset: number; limit: number }>()
);

export const fetchCourseTry = createAction(
  ActionTypes.FETCH_COURSE_TRY,
  props<{ id: number }>()
);

export const fetchCourseSuccess = createAction(
  ActionTypes.FETCH_COURSE_SUCCESS,
  props<{ course: any }>()
);

export const fetchCourseFail = createAction(
  ActionTypes.FETCH_COURSE_FAIL,
  props<any>()
);

export const updateCourseTopic_Try = createAction(
  ActionTypes.UPDATA_COURSE_TOPIC_TRY,
  props<{ idCourse: number; topicCourse: string }>()
);
export const updateCourseTopicSuccess = createAction(
  ActionTypes.UPDATA_COURSE_TOPIC_SUCCESS,
  props<{ updateCourse: any }>()
);
