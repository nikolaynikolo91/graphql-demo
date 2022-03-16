import { Component, OnInit } from '@angular/core';
import { ApolloAngularService } from './apollo.service';

@Component({
  selector: 'app-apollo-angular',
  templateUrl: './apollo-angular.component.html',
  styleUrls: ['./apollo-angular.component.scss'],
})
export class ApolloAngularComponent implements OnInit {
  constructor(private apolloService: ApolloAngularService) {}

  //Apollo Angular

  getSingleCourse() {
    this.apolloService
      .getSingleCourseWithId()
      .subscribe((data) => console.log(data, 'Apollo'));
  }

  updateTopicById() {
    this.apolloService
      .updateCourseByTopic()
      .subscribe((data) => console.log(data, 'Apollo'));
  }

  getNext() {
    this.apolloService.fetchMore();
  }

  ngOnInit(): void {
    this.apolloService
      .paginationStart()
      .subscribe((data) => console.log(data, 'Apollo'));
  }

  // getCoursesByTopic() {
  //   this.apolloService
  //     .getCoursesByTopic()
  //     .subscribe((data) => console.log(data, 'Apollo'));
  // }
}
