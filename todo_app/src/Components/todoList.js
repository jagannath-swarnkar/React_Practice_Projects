import React from 'react';

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

    // const edit = ()=>{
    //     console.log("good night")
    // }
    return (
        <div className="list">
            <ol>{todos.map((item,index)=> {
                return  <li key={index} onDoubleClick={props.edit} id={item.text}>
                <input id={item.text} type="checkbox" onChange={props.checkbox} 
                checked={item.done}/>
                <span >{item.text}</span>
            </li>
            }

            )}</ol>
        </div>
    )
}
