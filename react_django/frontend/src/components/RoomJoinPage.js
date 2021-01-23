import React, { Component } from "react";
import {Typography, TextField, Button, Grid, } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);

    this.state={
      roomCode:"",
      error:''
    };
  }

  txtRoomCodeChanged = (e) => {    
    this.setState({
      roomCode : e.target.value,
    });
  }

  btnEnterRoomPClicked = (e) => {
    const requestOptions = {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        code : this.state.roomCode
      })
    }
    fetch('/api/join-room', requestOptions).then(response=> {
      if (response.ok) {
        this.props.history.push('/room/' + this.state.roomCode)
      }
      else {
        this.setState({
          error : 'Room Not Found'});
      }
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <Grid container spacing={1} align='center'>
        <Grid item xs={12} >
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name = 'txtRoomCode'
            error = {this.state.error}
            label = 'Room Code'
            value = {this.state.roomCode}
            helperText = {this.state.error}
            placeholder = 'Enter a Room Code'
            variant = 'outlined'
            onChange = {this.txtRoomCodeChanged}
          >
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button color ="primary"  name='btnEnterRoom' variant="contained" onClick={this.btnEnterRoomPClicked}>
            Enter Room
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button color='Secondary' name='btnBack' variant='contained' component={Link} to='/'>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
