import React from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';

/*
  Styles
*/
const HeaderText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.5rem',
    'margin': '40px 0px 40px 0px'
  }
})(Typography);

const TitleText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '2rem'
  }
})(Typography);

const SubtitleText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.4rem',
    'color': 'lightgrey',
  }
})(Typography);

const StyledSlider = withStyles({
  root: {
    'margin-top': '40px'
  },
  markLabel: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1.5rem'
  },
  valueLabel: {
    'font-family': "'Alata', sans-serif",
    'font-size': '1rem'
  }
})(Slider);

const StyledButton = withStyles({
  root: {
    'display': 'block',
    'font-size': '1.4rem',
    'margin': '40px auto 0px',
    'padding': '20px 80px'
  }
})(Button);

/*
  GraphQL
*/
const CREATE_SUBMISSION = gql`
  mutation createSubmission($score: Int!, $strength: String, $weakness: String){
    createSubmission(score: $score, strength: $strength, weakness: $weakness){
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
export default function Form(){
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = React.useState(10);
  const [submitterId, setSubmitterId] = React.useState(null);
  const [strengthString, setStrengthString] = React.useState('');
  const [weaknessString, setWeaknessString] = React.useState('');
  const [createSubmission, {data}] = useMutation(CREATE_SUBMISSION);

  const marks = [
    {
      value: 0,
      label: 0
    },
    {
      value: 1,
      label: 1
    },
    {
      value: 2,
      label: 2
    },
    {
      value: 3,
      label: 3
    },
    {
      value: 4,
      label: 4
    },
    {
      value: 5,
      label: 5
    },
    {
      value: 6,
      label: 6
    },
    {
      value: 7,
      label: 7
    },
    {
      value: 8,
      label: 8
    },
    {
      value: 9,
      label: 9
    },
    {
      value: 10,
      label: 10
    }
  ];

  const handleOnChange = (event, value) => {
    setScore(value);
  };

  const handleTextChange = (event) => {
    switch(event.target.id){
      case "strengthField":
        setStrengthString(event.target.value);
        break;
      case "weaknessField":
        setWeaknessString(event.target.value);
        break;
      default:
        console.log('ERROR: No input given!');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSubmission({variables: {score: score, strength: strengthString, weakness: weaknessString}})
    .then((response) => {
      console.log('RESPONSE', response);
      setSubmitterId(response.data.createSubmission._id);
    })
    .then(() => {
      setOpen(true);
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return(
    <Container style={{marginTop: '40px'}}>
      <TitleText>I would like some feedback from you <span role="img" aria-label="">&#129488;</span></TitleText>
      <SubtitleText>Your submission will be completely anonymous as honest feedback is the goal <span role="img" aria-label="">&#129323;</span></SubtitleText>
      <form onSubmit={handleSubmit}>
        <HeaderText>On a scale of 0 to 10, how likely are you to recommend me as a person to work with?</HeaderText>
        <StyledSlider
          defaultValue={10}
          id="scoreField"
          marks={marks}
          max={10}
          min={0}
          onChange={handleOnChange}
          steps={10}
          valueLabelDisplay="on"/>
        <HeaderText>What do you consider is one of my greatest strengths?</HeaderText>
        <TextField
          id="strengthField"
          fullWidth={true}
          multiline
          onChange={handleTextChange}/>
        <HeaderText>What would you say is one area in which I could improve?</HeaderText>
        <TextField
          id="weaknessField"
          fullWidth={true}
          multiline
          onChange={handleTextChange}/>
        <div>
          <StyledButton type="submit" color="primary" variant="contained">Submit</StyledButton>
        </div>
      </form>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>
          <HeaderText>Thank you!</HeaderText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontFamily: "'Alata', sans-serif"}}>Your feedback has been given the id "<span style={{color: "blue", fontWeight: 'bold'}}>{submitterId}</span>" to maintain anonymity.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
};
