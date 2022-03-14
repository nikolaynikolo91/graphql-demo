import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { offsetLimitPagination } from '@apollo/client/utilities';

const GET_POST = `
  {
    message
  }
`;
const GET_POST2 = `
  {
    message2
  }
`;

const GET_SINGLE_COURSE = `
query getSingleCourse($courseID: Int!){
  course(id: $courseID){
    id
    title
    description
    topic
    url
  }
}
`;
const GET_COURSES_BY_TOPIC = `
query getCoursesByTopic($topic: String){
  courses(topic: $topic){
    id
    title
author
    description
    topic
    url
  }
}
`;

const UPDATE_TOPIC = `
mutation getUpdateTopic($id: Int!, $topic:String){
  updateCourseTopic(id:$id,  topic: $topic){
    id
    title
    author
    description
    topic
    url
  }
}`;

@Injectable({
  providedIn: 'root',
})
export class ApolloAngularService {
  constructor(private apollo: Apollo) {}

  getSimpleData() {
    return this.apollo.client.watchQuery({
      query: gql`
        ${GET_POST2}
      `,
    });
  }

  getSingleCourseWithId() {
    return this.apollo.client.watchQuery({
      query: gql`
        ${GET_SINGLE_COURSE}
      `,
      variables: {
        courseID: 1,
      },
    });
  }

  getCoursesByTopic() {
    return this.apollo.client.watchQuery({
      query: gql`
        ${GET_COURSES_BY_TOPIC}
      `,
      variables: {
        topic: 'Node.js',
      },
    });
  }

  updateCourseByTopic() {
    return this.apollo.client.watchQuery({
      query: gql`
        ${UPDATE_TOPIC}
      `,
      variables: {
        id: 4,
        topic: 'Node.js',
      },
    });
  }
}
