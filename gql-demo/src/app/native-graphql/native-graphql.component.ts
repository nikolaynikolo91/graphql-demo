import { Component, OnInit } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { NativeGraphqlService } from './native-graphql.service';

@Component({
  selector: 'app-native-graphql',
  templateUrl: './native-graphql.component.html',
  styleUrls: ['./native-graphql.component.scss'],
})
export class NativeGraphqlComponent implements OnInit {
  private paginationOffSet = 0;
  private pageSize = 2;

  constructor(private nativeGraph: NativeGraphqlService) {}

  getCourseById() {
    this.nativeGraph
      .query({
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
          courseID: 1,
        },
      })
      .subscribe((data) => console.log(data, 'Native'));
  }

  updateTopic() {
    this.nativeGraph
      .mutate({
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
          id: 1,
          topic: 'JavaScript',
        },
      })
      .subscribe((data) => console.log(data, 'Native'));
  }

  fetchMore() {
    this.nativeGraph
      .query({
        query: `query Feed($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          id
          title
          description
          topic
          url
        }
      }`,
        variables: {
          offset: 0,
          limit: this.paginationOffSet,
        },
      })
      .pipe(
        tap((result: any) => {
          this.paginationOffSet = result.posts.length + this.pageSize;
        })
      )
      .subscribe((data) => console.log(data, 'Native'));
  }

  ngOnInit(): void {
    this.nativeGraph
      .query({
        query: `query Feed($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          id
          title
          description
          topic
          url
        }
      }`,
        variables: {
          offset: 0,
          limit: this.pageSize,
        },
      })
      .pipe(
        tap((result: any) => {
          this.paginationOffSet = result.posts.length + this.pageSize;
        })
      )
      .subscribe((data) => console.log(data, 'Native'));
  }
}
