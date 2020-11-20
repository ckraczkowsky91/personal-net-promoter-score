var cors = require('cors');
var graphql = require('graphql');
var { graphqlHTTP } = require('express-graphql');
var express = require('express');
var mongoose = require('mongoose');

const { Submission } = require('./models');

mongoose.connect('mongodb://localhost:27017/net_promoter_score', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = express();
app.use(cors());

const {
  buildSchema,
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

var queryType = new GraphQLObjectType({
  name: 'getAllSubmissions',
  fields: {
    submissions: {
      type: GraphQLList(SubmissionType),
      resolve: () => {
        return Submission.find()
      }
    }
  }
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
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
app.listen(4001);
