import React, { Component } from "react";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl,
       Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);

    this.state={
      guestCanPause: true,
      votesToSkip: this.defaultVotes
    };
  }

  handleVotesToChange = (e) => {
    this.setState({
      votesToSkip : e.target.value,
    });
  }

  handleGuestCanPauseChange = (e) => {
    this.setState({
      guestCanPause : e.target.value === "true" ? true : false,
    }); 
  }

  handleRoomButtonPressed = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        guest_can_pause : this.state.guestCanPause,
        votes_to_skip : this.state.votesToSkip,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then(response => response.json())
      .then(data => this.props.history.push('/room/' + data.code));
  }

  render() {
    return( 
    <Grid container spacing = {1} >
      <Grid item xs={12} align="center"> 
        {/* xs=extra small */}
        <Typography component='h4' variant='h4'>
          Create A Room
        </Typography>
      </Grid> 

      <Grid item xs={12} align="center"> 
        <FormControl component='fieldset'>

          <FormHelperText>
            <div align='center'>
              Guest control of Playback State
            </div>
          </FormHelperText>
          
          <RadioGroup row defaultvalue='true' onChange={this.handleGuestCanPauseChange}>

            <FormControlLabel value="true" 
                control={<Radio color='Primary'/>}
                label="Play/Pause" labelPlacement="bottom">
            </FormControlLabel>

            <FormControlLabel value="false" 
                control={<Radio color='Secondary'/>}
                label="No Control" labelPlacement="bottom">
            </FormControlLabel>
          
          </RadioGroup>        
        
        </FormControl> 

      </Grid>

      <Grid item xs={12} align="center">

        <FormControl>
          
          <TextField required={true} onChange={this.handleVotesToChange} 
            defaultValue={this.defaultVotes} type="number"
            inputProps={{min:1, style: {textAlign: 'center'}}}>
          </TextField>

          <FormHelperText>
            <div align="center">
              Votes Required to Skip Song
            </div>
          </FormHelperText>

        </FormControl>

      </Grid>

      <Grid item xs={12} align="center">
        <Button color ="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
          Create A Room
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color ="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>

    </Grid>
    )
  }
}


