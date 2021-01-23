import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core'; 

export default class Room extends Component {
    constructor(props){
        super(props)

        this.state={
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };

        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }    
    
    getRoomDetails() {
        fetch('/api/get-room?code=' + this.roomCode)
            .then(response=> response.json())
            .then(data=> {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    btnLeaveRoom_Clicked = () => {
        alert("ok");    
    }

    render() {
        return (
            <div>
                <Grid container spacing ={1} align='center'>
                    <Grid items xs={12}>
                        <Typography variant='h3' component='h3'>
                            Room Code : {this.roomCode.toString()}
                        </Typography>                         
                    </Grid>

                    <Grid items xs={12}>
                        <Typography variant='h5' component='h5'>
                            Votes To Skip : {this.state.votesToSkip.toString()}
                        </Typography>
                    </Grid>

                    <Grid items xs={12}>
                        <Typography variant='h5' component='h5'>
                            Guest Can Pause : {this.state.guestCanPause.toString()}
                        </Typography>
                    </Grid>

                    <Grid items xs={12}>
                        <Typography variant='h5' component='h5'>
                            Is Host : {this.state.isHost.toString()}
                        </Typography>
                    </Grid>

                    <Grid items xs={12}>
                        <Button color='Secondary' name='btnLeaveRoom' variant='contained' onClick={this.btnLeaveRoom_Clicked}>
                            Leave Room
                        </Button>
                    </Grid>
                </Grid>                
            </div>
        );
    }
    
}