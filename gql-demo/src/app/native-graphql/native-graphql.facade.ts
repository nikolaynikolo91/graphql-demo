import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  fetchCourseTry,
  fetchPostTry,
  updateCourseTopic_Try,
} from './state/native-graphql.actions';
import {
  AppState,
  courseSelector,
  postsSelector,
} from './state/native-graphql.selectors';

@Injectable({ providedIn: 'root' })
export class NativeGraphqlFacade {
  public posts$ = this.store.pipe(select(postsSelector));
  public course$ = this.store.pipe(select(courseSelector));

  constructor(private store: Store<AppState>) {}

  fetchPosts() {
    this.store.dispatch(fetchPostTry());
  }

  fetchCourse(id: number) {
    this.store.dispatch(fetchCourseTry({ id }));
  }

  updateCourseTopic(id: number, topic: string) {
    this.store.dispatch(
      updateCourseTopic_Try({ idCourse: id, topicCourse: topic })
    );
  }
}
