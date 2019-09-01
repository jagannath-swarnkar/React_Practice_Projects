import React from 'react';

function Todo(props){

    return(
        <div className="todo">
            <input onKeyPress={props.addItem} autoFocus type="text" value={props.todo} onChange={props.onChangeHandler}/>
            <button id="button" onClick={props.addItem}>Submit</button>
        </div>
    )
}
export default Todo
