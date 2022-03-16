import { Component, OnInit } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { NativeGraphqlService } from './native-graphql.service';

@Component({
  selector: 'app-native-graphql',
  templateUrl: './native-graphql.component.html',
  styleUrls: ['./native-graphql.component.scss'],
})
export class NativeGraphqlComponent implements OnInit {
  course: any;
  posts: any[] = [];

  private paginationOffSet = 0;
  private pageSize = 2;

  constructor(private nativeGraph: NativeGraphqlService) {}

  getCourseById(id: number) {
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
          courseID: id,
        },
      })
      .subscribe((data: any) => {
        this.course = data.course;
        console.log(data.course, 'Native');
      });
  }

  updateTopic(id: number, topic: string) {
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
          id: id,
          topic: topic,
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
      .subscribe((data) => {
        this.posts = data.posts;
        console.log(data.posts, 'Native');
      });
  }
}
