import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography} from '@material-ui/core'

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state={
      roomCode : null,
    }
  }

  async componentDidMount()
  {
    fetch('/api/user-in-room')
      .then(response => response.json())
      .then(data => { 
        this.setState({
          roomCode: data.code
        });
      });
  }

  createHomePage() {
    return (
    <Grid container spacing = {3} align='center'>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup color="Primary" disableElevation variant='contained'>
          <Button color="Primary" component={Link} to='/create'>
            Create a Room
          </Button>

          <Button color ="Secondary" component={Link} to='/join'>
            Join a Room
          </Button>
        </ButtonGroup>
      </Grid>     
    </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"
            render={() => {
              return this.state.roomCode 
                ? <Redirect to = {'/room/' + this.state.roomCode } />
                : this.createHomePage()
            }}            
          />            
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path='/room/:roomCode' component={Room}/>
        </Switch>
      </Router>
    );
  }
}
