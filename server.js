var cors = require('cors');
var graphql = require('graphql');
var { graphqlHTTP } = require('express-graphql');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

const { Submission, User } = require('./models');

const app = express();
const port = process.env.PORT || 4000;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/net_promoter_score';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// tell Express where to find static content i.e. HTML files, stylesheets, and images
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(cors());

const {
  buildSchema,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString
} = graphql;

var SubmissionType = new GraphQLObjectType({
  name: 'SubmissionType',
  fields: {
    _id: {
      type: GraphQLID
    },
    score: {
      type: GraphQLInt
    },
    strength: {
      type: GraphQLString
    },
    weakness: {
      type: GraphQLString
    }
  }
});

var UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllSubmissions: {
      type: GraphQLList(SubmissionType),
      resolve: () => {
        return Submission.find()
      }
    },
    getAllUsers: {
      type: GraphQLList(UserType),
      resolve: () => {
        return User.find()
      }
    }
  }
});

var mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createSubmission: {
      type: SubmissionType,
      args: {
        score: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        strength: {
          type: GraphQLString
        },
        weakness: {
          type: GraphQLString
        }
      },
      resolve(parent, args){
        let newSubmission = new Submission({
          score: args.score,
          strength: args.strength,
          weakness: args.weakness
        });
        return newSubmission.save();
      }
    },
    createUser: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args){
        let newUser = new User({
          username: args.username,
          password: args.password
        });
        return newUser.save();
      }
    },
    authenticateUser: {
      type: GraphQLBoolean,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args){
        return User.findOne({username: args.username, password: args.password})
        .then((user) => {
          if(user){
            return true;
          } else {
            return false;
          };
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          return false;
        });
      }
    }
  }
});

var schema = new GraphQLSchema({query: queryType, mutation: mutationType});

app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(port);
