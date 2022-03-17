import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NativeGraphqlFacade } from './native-graphql.facade';

@Component({
  selector: 'app-native-graphql',
  templateUrl: './native-graphql.component.html',
  styleUrls: ['./native-graphql.component.scss'],
})
export class NativeGraphqlComponent implements OnInit {
  posts$: Observable<any[]> = this.facade.posts$;
  course$: Observable<any> = this.facade.course$;

  constructor(private facade: NativeGraphqlFacade) {}

  getCourseById(id: number) {
    this.facade.fetchCourse(id);
  }

  updateTopic(id: number, topic: string) {
    this.facade.updateCourseTopic(id, topic);
  }

  fetchMore() {
    this.facade.fetchPosts();
  }

  ngOnInit(): void {
    this.facade.fetchPosts();
  }
}
