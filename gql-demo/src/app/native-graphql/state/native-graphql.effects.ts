import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { NativeGraphqlService } from '../native-graphql.service';
import {
  fetchCourseFail,
  fetchCourseSuccess,
  fetchCourseTry,
  fetchPostFail,
  fetchPostSuccess,
  fetchPostTry,
  updateCourseTopicSuccess,
  updateCourseTopic_Try,
  updatePagination,
} from './native-graphql.actions';
import {
  AppState,
  courseSelector,
  paginationSelector,
  updatedCourseSelector,
} from './native-graphql.selectors';

@Injectable({ providedIn: 'root' })
export class NativeEffect {
  constructor(
    private service: NativeGraphqlService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPostTry),
      withLatestFrom(this.store.pipe(select(paginationSelector))),
      switchMap(([, pagination]) =>
        this.service.query({
          query: `query Feed($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          id
          title
          description
          topic
          url
        }
      }`,
          variables: pagination,
        })
      ),
      map((data: any) => {
        console.log(data.posts);
        return fetchPostSuccess({ posts: data.posts });
      }),
      catchError((error) => of(fetchPostFail(error)))
    );
  });

  updatePagination$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPostSuccess),
      withLatestFrom(this.store.pipe(select(paginationSelector))),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      map(([, pagination]) =>
        updatePagination({
          limit: pagination.limit,
          offset: pagination.offset + 2,
        })
      )
    );
  });

  fetchCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCourseTry),
      withLatestFrom(this.store.pipe(select(courseSelector))),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      switchMap(([props, storeCourse]) =>
        this.service.query({
          query: `
        query getSingleCourse($courseID: Int!) {
          course(id: $courseID) {
            id
            title
            description
            topic
            url
          }
        }
      `,
          variables: {
            courseID: props.id,
          },
        })
      ),
      map((data: any) => {
        console.log(data.course);
        return fetchCourseSuccess({ course: data.course });
      }),
      catchError((error) => of(fetchCourseFail(error)))
    );
  });

  updateTopic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourseTopic_Try),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      withLatestFrom(this.store.pipe(select(updatedCourseSelector))),
      switchMap(([props]) =>
        this.service.mutate({
          mutation: `
            mutation getUpdateTopic($id: Int!, $topic: String) {
              updateCourseTopic(id: $id, topic: $topic) {
                id
                title
                author
                description
                topic
                url
              }
            }
          `,
          variables: {
            id: props.idCourse,
            topic: props.topicCourse,
          },
        })
      ),
      map((data) => {
        console.log(data.updateCourseTopic);
        return updateCourseTopicSuccess({
          updateCourse: data.updateCourseTopic,
        });
      }),
      catchError((error) => of(fetchCourseFail(error)))
    );
  });
}
