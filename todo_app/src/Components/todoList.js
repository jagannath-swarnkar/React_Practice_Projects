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
    return (
        <div className="list">
            <ol>{todos.map((item,index)=> {
                return  <li key={index}>
                <input id={item.text} value={item} type="checkbox" onChange={props.checkbox} 
                    checked={item.done}/>
                {item.text}
            </li>
            }

            )}</ol>
        </div>
    )
}
