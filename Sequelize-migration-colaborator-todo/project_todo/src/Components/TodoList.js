import React from 'react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Divider, Card, Dialog, Typography } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import {todos as reduceTodo} from '../actions';
import _ from 'underscore';
import Notes from './Notes';

// import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { TextareaAutosize } from '@material-ui/core';
// import Button from '@material-ui/core/Button';

import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import SubjectIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/Comment';
import Comments from './Comments';



const useStyles = makeStyles(theme => ({
    root: {
      width: '99%',
      display:"flex",
      flexDirection:"column",
    },
    card:{
        background:'skyblue',
        margin:'5px',
    },

    listItem:{
        // border:"2px solid black",
        margin:'5px',
    },
    Input:{
      width:"100%",
    },
    IconButton:{
      alignItems:"flex-end",
    },
    h1:{color:'red',},
  }));

export default function TodoList(props) {
    const classes = useStyles();
    const itemList = useSelector((state)=> state.todos);
    const dispatch = useDispatch();
    const [editNote, setEditNote] = React.useState(false)
    const [isNote, setIsNote] = React.useState(false);
    // const [done, setDone] = React.useState(false);
    const [item, setItem] = React.useState('');
    const [editId, setEditId] = React.useState('');
    const [todoId, setTodoId] = React.useState('');
    const [todoValue, setTodoValue] = React.useState('');

    const deleteHandler=(e)=>{
        var project_id = props.project_id
        var Token =reactLocalStorage.get('token');
        axios
        .post('http://localhost:3030/delete/'+e,{id:e,token:Token,project_id:project_id})
        .then((result)=>{
            dispatch(reduceTodo('GET_TODO',result.data))
        })
        .catch((err)=>{console.log('err in sending delete id to backend',err)})
    }

    const edit = (id) =>{
        
        var dict = _.findWhere(itemList,{id:id})
        console.log('kallua',dict.text)
        setItem(dict.text)
        setEditId(id)
        setTodoId(dict.id)

    }


    const updateTodo=(e)=>{      
      if(e.key==="Enter"){
          if((item.length>0) && (item.match(/[a-z]/i))){
              axios
              .put('http://localhost:3030/edit/'+editId,({
                  id : editId,
                  text : item,
                  project_id : props.project_id,
                  token : reactLocalStorage.get('token')
                  }))
              .then((result)=>{
                    console.log('todo updated successfully',result.data)
                    dispatch(reduceTodo('GET_TODO',result.data))
                    setEditId('')
                    setTodoId('')
                    setItem('')
                  })
              .catch((err)=>{
                  console.log('err in sending todo to backend',err)
                  })
          }
      }
  }


  const checkbox = (e) => {
    console.log('checbox')
    var dict = _.findWhere(itemList,{id:parseInt(e.target.id,10)});     
    if(dict.done === 0 || dict.done === false){
      console.log('true')
      dict.done=true
      dispatch(reduceTodo('GET_TODO',itemList))
        axios
        .put('http://localhost:3030/done/'+dict.id,{
            done:true,
            text:dict.text,
            token:reactLocalStorage.get('token'),
            id:dict.id
          })
        .then(()=>{console.log('done updated to true')
        console.log(itemList);
        // dispatch(reduceTodo('GET_TODO',itemList))
          // dispatch(reduceTodo(itemList))
          
        })
        .catch((err)=>{console.log('err in done updating',err)
        })
    }else{
      console.log(false,dict.id);
      
      dict.done=false
      dispatch(reduceTodo('GET_TODO',itemList))
        axios
        .put('http://localhost:3030/done/'+dict.id,{
            done:false,
            text:dict.text,
            token:reactLocalStorage.get('token'),
            id:dict.id
          })
        .then(()=>{console.log('done updated to false')
        // console.log(itemList);
        
        })
        .catch((err)=>{console.log('err in done updating',err)
        })
    }
}

const noteOpen = () => {
  setIsNote(true)
}



    const listState = props.defaultList;
    const todos = itemList.filter((it) => {
        if ( listState === 'Pending' ) {            
            return !it.done;
        } else if ( listState === 'Done') {
            return it.done;
        } else {
            return true;
        }
    })

  // if(isNote){
  //   return(
  //     <Dialog 
  //           fullWidth
  //           open={isNote} //isNote 
  //           onClose={()=>{setIsNote(false)}} 
  //           >
  //       <DialogTitle 
  //           style={{background:"blue",color:"white"}}
  //           id="form-dialog-title"
  //           >
  //             <div style={{display:'flex'}}>
  //               <div style={{flexGrow:1}}>
  //                 <AssignmentIcon/>
  //               </div>
  //               <div style={{flexGrow:98}}>
  //                 <Typography style={{marginLeft:'5px'}}>
  //                   {todoValue.text}{todoValue.id}
  //                 </Typography>
  //               </div>
  //               <div style={{flexGrow:1,cursor:'pointer'}} onClick={()=>{setIsNote(false)}}>
  //                 <CloseIcon/>
  //               </div>
  //             </div>
  //         </DialogTitle>
  //         <DialogContent>
  //           <div style={{marginBottom:"20px"}}>
  //             <div style={{display:'flex'}}>
  //                 <div style={{flexGrow:1}}>
  //                   <CommentIcon/>
  //                 </div>
  //                 <div style={{flexGrow:98}}>
  //                   <Typography style={{
  //                               marginLeft:'5px',
  //                               color:'black',
  //                               fontWeight:"bold"
  //                               }}>
  //                     {"Comments:"}
  //                   </Typography>
  //                 </div>
  //               </div>
  //               <Typography >
  //                 <Comments
  //                 todoId={todoValue.id}
  //                 />
  //               </Typography>
  //           </div>
          
          
  //           <div style={{display:'flex'}}>
  //               <div style={{flexGrow:1}}>
  //                 <NotesIcon/>
  //               </div>
  //               <div style={{flexGrow:98}}>
  //                 <Typography style={{marginLeft:'5px',color:'black',fontWeight:"bold"}}>
  //                   {"Description"}
  //                 </Typography>
  //               </div>
  //             </div>

  //           <Typography style={{marginLeft:'30px'}} >
  //             <Notes 
  //               editNote={editNote}
  //               closeNote={()=>{setEditNote(false)}}
  //               openNote={()=>{setEditNote(true)}}
  //               todoId={todoValue.id}
  //               todoNote={todoValue.note}
  //             />
  //           </Typography>
              
  //         </DialogContent>
          
  //     </Dialog>
  //   )
  // }

    return (
        <List className={classes.root}>
          {todos.map((value,index) => {
              if(value.id===todoId){
                return (
                  <Card 
                    className={classes.card}
                    >
                    <ListItem 
                        style={{background:'black',color:'white'}}
                        >
                        <ListItemText>
                            Assigned By : {value.user_email}
                        </ListItemText>
                    
                        Assigned To : {value.assigned_to}
                    </ListItem>
                    <Divider/>
                    <ListItem key={index}>
                      <ListItemIcon>
                      <div onClick={(e)=>{checkbox(e)}}>
                        <Checkbox title="Checkbox"
                                  checked={value.done} 
                                  // onClick={(e)=>checkbox(e)}
                                  id={value.id} />
                      </div>
                      </ListItemIcon>
                      <Input title="press enter to save"
                             value={item} 
                             onChange={(e)=>{setItem(e.target.value)}}
                             error 
                             onKeyPress={updateTodo}
                             autoFocus 
                             fullWidth/>
                      <ListItemSecondaryAction>
                      <IconButton 
                        title="delete"
                        edge="end" 
                        aria-label="comments"  
                        id={value.id} 
                        onClick={()=>{deleteHandler(value.id)}}>
                        <HighlightOffIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                  </Card>
                );
              }else{
                return (
                    <Card 
                    className={classes.card}
                    >
                    <ListItem 
                        style={{background:'black',color:'white'}}
                        >
                        <ListItemText>
                            Assigned By : {value.user_email}
                        </ListItemText>
                    
                        Assigned To : {value.assigned_to}
                    </ListItem>
                    <Divider/>
                  <ListItem key={index}
                    className={classes.listItem}
                    value={value.text} 
                    id={value.id}>
                    <ListItemIcon>
                      <div onClick={checkbox}>
                      <Checkbox 
                        title="Checkbox"
                        checked={value.done}
                        // onClick={checkbox}
                        // onClick={(e)=>checkbox(e)}
                        id={value.id} />
                        </div>
                    </ListItemIcon>
                    <ListItemText title="click here to add a note"
                      onClick={()=>{noteOpen();setTodoValue(value)}}
                        id={value.id} 
                        primary={`${value.text}`} 
                        />
                    <Typography title='This todo has a note'>
                      <SubjectIcon title="todo"/>
                    </Typography>
                    <div title="edit" 
                            style={{
                              marginRight:'20px', 
                              marginLeft:'20px'}} 
                              onClick={()=>{edit(value.id)}}
                              >
                      <EditIcon/>
                    </div>
                    <ListItemSecondaryAction>
                      
                      <IconButton 
                        title="delete"
                        edge="end" 
                        aria-label="comments"  
                        id={value.id} 
                        onClick={()=>{deleteHandler(value.id)}}>
                        <HighlightOffIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>

                  {/* <Dialog 
                    fullWidth
                    open={isNote} //isNote 
                    onClose={()=>{setIsNote(false)}} 
                    >
                      <DialogTitle 
                          style={{background:"blue",color:"white"}}
                          id="form-dialog-title"
                          >
                            <div style={{display:'flex'}}>
                              <div style={{flexGrow:1}}>
                                <AssignmentIcon/>
                              </div>
                              <div style={{flexGrow:98}}>
                                <Typography style={{marginLeft:'5px'}}>
                                  {value.text}
                                </Typography>
                              </div>
                              <div style={{flexGrow:1,cursor:'pointer'}} onClick={()=>{setIsNote(false)}}>
                                <CloseIcon/>
                              </div>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                          <div style={{marginBottom:"20px"}}>
                            <div style={{display:'flex'}}>
                                <div style={{flexGrow:1}}>
                                  <CommentIcon/>
                                </div>
                                <div style={{flexGrow:98}}>
                                  <Typography style={{
                                              marginLeft:'5px',
                                              color:'black',
                                              fontWeight:"bold"
                                              }}>
                                    {"Comments:"}
                                  </Typography>
                                </div>
                              </div>
                              <Typography >
                                <Comments
                                todoId={value.id}
                                />
                              </Typography>
                          </div>
                        
                        
                          <div style={{display:'flex'}}>
                              <div style={{flexGrow:1}}>
                                <NotesIcon/>
                              </div>
                              <div style={{flexGrow:98}}>
                                <Typography style={{marginLeft:'5px',color:'black',fontWeight:"bold"}}>
                                  {"Description"}
                                </Typography>
                              </div>
                            </div>

                          <Typography style={{marginLeft:'30px'}} >
                            <Notes 
                              editNote={editNote}
                              closeNote={()=>{setEditNote(false)}}
                              openNote={()=>{setEditNote(true)}}
                              todoId={value.id}
                              todoNote={value.note}
                            />
                          </Typography>
                            
                        </DialogContent>
                        
                  </Dialog> */}
                  </Card>
                  
                );
              }
          })}
          <Dialog 
            fullWidth
            open={isNote} //isNote 
            onClose={()=>{setIsNote(false)}} 
            >
        <DialogTitle 
            style={{background:"blue",color:"white"}}
            id="form-dialog-title"
            >
              <div style={{display:'flex'}}>
                <div style={{flexGrow:1}}>
                  <AssignmentIcon/>
                </div>
                <div style={{flexGrow:98}}>
                  <Typography style={{marginLeft:'5px'}}>
                    {todoValue.text}{todoValue.id}
                  </Typography>
                </div>
                <div style={{flexGrow:1,cursor:'pointer'}} onClick={()=>{setIsNote(false)}}>
                  <CloseIcon/>
                </div>
              </div>
          </DialogTitle>
          <DialogContent>
            <div style={{marginBottom:"20px"}}>
              <div style={{display:'flex'}}>
                  <div style={{flexGrow:1}}>
                    <CommentIcon/>
                  </div>
                  <div style={{flexGrow:98}}>
                    <Typography style={{
                                marginLeft:'5px',
                                color:'black',
                                fontWeight:"bold"
                                }}>
                      {"Comments:"}
                    </Typography>
                  </div>
                </div>
                <Typography >
                  <Comments
                  todoId={todoValue.id}
                  />
                </Typography>
            </div>
          
          
            <div style={{display:'flex'}}>
                <div style={{flexGrow:1}}>
                  <NotesIcon/>
                </div>
                <div style={{flexGrow:98}}>
                  <Typography style={{marginLeft:'5px',color:'black',fontWeight:"bold"}}>
                    {"Description"}
                  </Typography>
                </div>
              </div>

            <Typography style={{marginLeft:'30px'}} >
              <Notes 
                editNote={editNote}
                closeNote={()=>{setEditNote(false)}}
                openNote={()=>{setEditNote(true)}}
                todoId={todoValue.id}
                todoNote={todoValue.note}
              />
            </Typography>
              
          </DialogContent>
          
      </Dialog>
        </List>
      );
}
