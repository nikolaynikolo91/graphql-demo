export type Course = {
  id: number;
  title: string;
  author: string;
  description: string;
  topic: string;
  url: string;
};

export type Query = {
  course: Course;
  courses: Course[];
};

export type Mutation = {
  updateCourseTopic: Course;
};
