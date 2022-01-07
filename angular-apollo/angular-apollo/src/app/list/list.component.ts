import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Course } from '../types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Suppose our profile query took an avatar size
const GET_COURSES_TOPICS = gql`
  query GetCourses($topic: String!) {
    courses(topic: $topic) {
      title
      author
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  courses!: Observable<Course[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.courses = this.apollo
      .watchQuery<{ courses: Course[] }>({
        query: GET_COURSES_TOPICS,
        variables: {
          topic: 'Node.js',
        },
      })
      .valueChanges.pipe(map(({ data }) => data.courses));
  }
}
