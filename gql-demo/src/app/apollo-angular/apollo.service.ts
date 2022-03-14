import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloAngularService {
  private paginationOffSet = 0;
  private pageSize = 2;

  private feedQuery = this.apollo.watchQuery({
    query: gql`
      query Feed($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          id
          title
          description
          topic
          url
        }
      }
    `,
    variables: {
      offset: 0,
      limit: this.pageSize,
    },
  });

  constructor(private apollo: Apollo) {}

  getSimpleData() {
    return this.apollo.client.watchQuery({
      query: gql`
        {
          message2
        }
      `,
    });
  }

  getSingleCourseWithId() {
    return this.apollo.client.watchQuery({
      query: gql`
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
    });
  }

  getCoursesByTopic() {
    return this.apollo.client.watchQuery({
      query: gql`
        query getCoursesByTopic($topic: String) {
          courses(topic: $topic) {
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
        topic: 'Node.js',
      },
    });
  }

  updateCourseByTopic() {
    return this.apollo.mutate({
      mutation: gql`
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
        topic: 'Angular',
      },
    });
  }

  paginationStart() {
    return this.feedQuery.valueChanges.pipe(
      tap((result: any) => {
        this.paginationOffSet = result.data.posts.length;
      })
    );
  }

  fetchMore() {
    return this.feedQuery.fetchMore({
      // query: ... (you can specify a different query. feedQuery is used by default)
      variables: {
        offset: this.paginationOffSet,
      },
    });
  }
}
