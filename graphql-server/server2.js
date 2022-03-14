var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
   course(id: Int!): Course
   courses(topic: String): [Course]
   message:String
   message2:String
   getContent: [String]
   posts(offset: Int, limit: Int): [Course]
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
  {
    id: 5,
    title: "five title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
  {
    id: 6,
    title: "six title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
  {
    id: 7,
    title: "seven title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
  {
    id: 8,
    title: "eight title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
  {
    id: 9,
    title: "nine title",
    author: "Andrew Mead, Rob Percival",
    description: "four description",
    topic: "JavaScript",
    url: "https:foururl",
  },
  {
    id: 10,
    title: "ten title",
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

var getNext = function ({ offset, limit }) {
  // console.log(coursesData.slice(offset, limit));
  return coursesData.slice(offset, offset + limit);
};

// The root provides a resolver function for each API endpoint
var root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
  message: () => "Hello Word!",
  message2: () => "Hello again! ",
  posts: getNext,
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
