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
    this.apolloService.getSingleCourseWithId().subscribe(console.log);
  }

  updateTopicById() {
    this.apolloService.updateCourseByTopic().subscribe(console.log);
  }

  getCoursesByTopic() {
    this.apolloService.getCoursesByTopic().subscribe(console.log);
  }

  getNext() {
    this.apolloService.fetchMore();
  }

  ngOnInit(): void {
    this.apolloService.paginationStart().subscribe(console.log);
  }
}
