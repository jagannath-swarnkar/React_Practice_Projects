import React from 'react';
// import { Button } from 'reactstrap';
import './todoList.css';

export default function List(props) {
    const listState = props.defaultList;
    const todos = props.itemList.filter((it) => {
        if ( listState === 'pending' ) {            
            return !it.done;
        } else if ( listState === 'done') {
            return it.done;
        } else {
            return true;
        }
    });

    return (
            <ol>{todos.map((item,index)=> {
                if(item.id===props.todoId){
                return(
                    <li className="container">
                        <input id={item.text} className="edit textItem" type="checkbox" onChange={props.checkbox} checked={item.done}/> 
                        <input id={item.text} className="edit editItem2" type="text" value={props.todo} onChange={props.editChangeHandler} onKeyPress={props.addItem} autoFocus/>
                    </li>
                )}
                else{
                return ( 
                    <li key={index} onDoubleClick={props.edit} id={item.text}>
                    <input className="textItem" id={item.text} type="checkbox" onChange={props.checkbox} checked={item.done}/>{item.text}
                        {/* <Button id="delButton" color="danger">Delete</Button> */}
                    </li>
                )}
            })}
        </ol>
    )
}