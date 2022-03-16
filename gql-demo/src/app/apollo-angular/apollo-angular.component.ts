import { Component, OnInit } from '@angular/core';
import { ApolloAngularService } from './apollo.service';

@Component({
  selector: 'app-apollo-angular',
  templateUrl: './apollo-angular.component.html',
  styleUrls: ['./apollo-angular.component.scss'],
})
export class ApolloAngularComponent implements OnInit {
  course: any;
  posts: any[] = [];

  constructor(private apolloService: ApolloAngularService) {}

  //Apollo Angular

  getSingleCourse(id: number) {
    this.apolloService.getSingleCourseWithId(id).subscribe((data: any) => {
      this.course = data.data.course;
      console.log(data.data.course, 'Apollo');
    });
  }

  updateTopicById(id: number, topic: string) {
    this.apolloService
      .updateCourseByTopic(id, topic)
      .subscribe((data) => console.log(data, 'Apollo'));
  }

  getNext() {
    this.apolloService.fetchMore();
  }

  ngOnInit(): void {
    this.apolloService.paginationStart().subscribe((data) => {
      this.posts = data.data.posts;
      console.log(data.data, 'Apollo');
    });
  }

  // getCoursesByTopic() {
  //   this.apolloService
  //     .getCoursesByTopic()
  //     .subscribe((data) => console.log(data, 'Apollo'));
  // }
}
