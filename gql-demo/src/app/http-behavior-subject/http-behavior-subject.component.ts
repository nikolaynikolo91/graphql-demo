import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CourseModel,
  HttpBehaviorSubjectService,
} from './http-behavior-subject.service';

@Component({
  selector: 'app-http-behavior-subject',
  templateUrl: './http-behavior-subject.component.html',
  styleUrls: ['./http-behavior-subject.component.scss'],
})
export class HttpBehaviorSubjectComponent implements OnInit {
  course$: BehaviorSubject<any> = new BehaviorSubject('');
  posts$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private service: HttpBehaviorSubjectService) {}

  ngOnInit(): void {
    this.service.getPosts().subscribe((res) => this.posts$.next(res));
  }

  getCourseById(id: number) {
    this.service.getCourse(id).subscribe((res) => this.course$.next(res));
  }

  updateTopic(id: number, topic: string) {
    this.service.updateTopic(id, topic).subscribe((res) => {
      let updatedPosts = this.posts$
        .getValue()
        .map((obj: CourseModel) => (res.id === obj.id ? res : obj));

      this.posts$.next(updatedPosts);
      if (res.id === this.course$.getValue().id) {
        this.course$.next(res);
      }
    });
  }

  fetchMore() {
    this.service
      .getPosts()
      .subscribe((res) => this.posts$.next(this.posts$.getValue().concat(res)));
  }
}
