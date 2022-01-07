var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
   course(id: Int!): Course
   courses(topic: String): [Course]
  }
  type Mutation {
    updateCourseTopic(id: Int!, topic: String): Course
  }
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

var coursesData = [
  {
    id: 1,
    title: "First title",
    author: "Andrew Mead, Rob Percival",
    description: "first description",
    topic: "Node.js",
    url: "https:firsturl",
  },
  {
    id: 2,
    title: "second title",
    author: "Andrew Mead, Rob Percival",
    description: "second description",
    topic: "JavaScript",
    url: "https:secondurl",
  },
  {
    id: 3,
    title: "third title",
    author: "Andrew Mead, Rob Percival",
    description: "third description",
    topic: "Node.js",
    url: "https:thirdurl",
  },
  {
    id: 4,
    title: "four title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
];

var getCourse = function (args) {
  var id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};

var getCourses = function (args) {
  if (args.topic) {
    var topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  } else {
    return coursesData;
  }
};

var updateCourseTopic = function ({ id, topic }) {
  coursesData.map((course) => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter((course) => course.id === id)[0];
};

// The root provides a resolver function for each API endpoint
var root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
};

var app = express();
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
