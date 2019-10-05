import React,{Component} from 'react';
// import Ans from './Ans';

// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class QAlist extends Component{
render(){
  return(
    <List className="root" >
      
      {this.props.Qlist.map((q,i)=>{

        var md = this.props.ans.map((data,index)=>{
          if(data.Q_id==q.Q_id){
            return(
              <li key={index}>{data.answer}<Divider variant="inset" component="li" /></li>
            )
          }}
        )
        
        if(this.props.editId==q.Q_id){
        return(
          <ListItem key={i} alignItems="flex-start" >
            <ListItemAvatar>
              <Avatar alt={i}  />
            </ListItemAvatar>
            <ListItemText
              primary={q.question}
              secondary={
                
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // color="textPrimary"
                  >
                  <Divider variant="inset" component="li" />
                  {md}
                    </Typography>                   
                   
                        <TextField
                          label="Write your answer here"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          id={q.Q_id.toString()}
                          onChange={this.props.ansChangeHandler}
                          onKeyPress={this.props.addAns}
                          value={this.props.ansItem}
                        />
                </React.Fragment>
              }
            />
          </ListItem>)
        }else{
          return(
            <ListItem key={i} alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt={i}  />
              </ListItemAvatar>
              <ListItemText
                primary={q.question}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // color="textPrimary"
                    >
                      <Divider variant="inset" component="li" />
                      {md}
                    </Typography>

                          <TextField
                            label="Write your answer here"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            id={q.Q_id.toString()}
                            onChange={this.props.ansChangeHandler}
                            value={''}
                          />
                  </React.Fragment>
                }
              />
            </ListItem>)
        }
    })}
      </List>
    )
  }
}
