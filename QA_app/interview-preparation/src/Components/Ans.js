import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function Ans(props) {
  const classes = useStyles();


  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Write your answer here"
        className={classes.textField}
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={props.ansChangeHandler}
        // onKeyPress={props.addAns}
        value={props.value}
        // onChange={handleChange('name')}
      />
    </form>
  );
}
