import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

interface ModelRequest {
  query?: string;
  mutation?: string;
  variables?: { [key: string]: any };
}

export interface CourseModel {
  description: string;
  id: number;
  title: string;
  topic: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpBehaviorSubjectService {
  constructor(private http: HttpClient) {}

  private offSet = 0;
  private pageSize = 2;

  public query<T>(options: ModelRequest): Observable<T> {
    return this.http
      .post<{ data: T }>(`http://localhost:4000/graphql`, {
        query: options.query,
        variables: options.variables,
      })
      .pipe(map((d) => d.data));
  }

  public mutate<T>(options: ModelRequest): Observable<any> {
    return this.http
      .post<{ data: T }>(`http://localhost:4000/graphql`, {
        query: options.mutation,
        variables: options.variables,
      })
      .pipe(map((d) => d.data));
  }

  getPosts() {
    return this.query({
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
        offset: this.offSet,
        limit: this.pageSize,
      },
    }).pipe(
      map((res: any) => res.posts),
      tap((res: CourseModel[]) => (this.offSet = res.length))
    );
  }

  updateTopic(id: number, topic: string) {
    return this.mutate({
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
    }).pipe(
      map((res) => res.updateCourseTopic),
      tap(console.log)
    );
  }

  getCourse(id: number) {
    return this.query({
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
    }).pipe(
      map((res: any) => res.course),
      tap((data: CourseModel) => console.log(data))
    );
  }
}
