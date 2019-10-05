import React, { Component } from 'react';
import {Grid, TextField,Paper} from "@material-ui/core";

class Question extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <Paper style={{ margin: 16, padding: 14 }}>
                <Grid container>
                    <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            label="Add Question here"
                            value={this.props.item}
                            onChange={this.props.onChangeHandler}
                            onKeyPress={this.props.addQues}
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default Question;
