import React from 'react';
import {
  Card,
  Container
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

/*
  GraphQL
*/
const GET_SUBMISSIONS = gql`
  query getAllSubmissions{
    submissions{
      _id
      score
      strength
      weakness
    }
  }
`;

/*
  Component
*/
export default function Admin(){
  const {loading, data} = useQuery(GET_SUBMISSIONS);

  if (loading) return 'Loading...';

  return(
    <Container>
    {
      data.submissions.map(submission => (
        <Card variant="outlined">
          <div>{submission.score}</div>
          <div>{submission.strength}</div>
          <div>{submission.weakness}</div>
        </Card>
      ))
    }
    </Container>
  );
};
