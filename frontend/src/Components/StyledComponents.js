import {
  Button,
  Slider,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const FormButton = withStyles({
  root: {
    'display': 'block',
    'font-family': "'Alata', sans-serif",
    'font-size': '1.4rem',
    'margin': '40px auto 0px',
    'padding': '20px 80px'
  }
})(Button);

const LoginButton = withStyles({
  root: {
    'background': '#F25278',
    'color': 'white',
    'display': 'block',
    'font-family': "'Alata', sans-serif",
    'font-size': '1.4rem',
    'margin': '40px auto 0px',
    'width': '90%'
  }
})(Button);

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

const TitleText = withStyles({
  root: {
    'font-family': "'Alata', sans-serif",
    'font-size': '2rem'
  }
})(Typography);

export { FormButton, LoginButton, StyledSlider, TitleText };
