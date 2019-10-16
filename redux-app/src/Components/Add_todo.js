import React from 'react';
import { useDispatch } from 'react-redux';
import { setTodo } from '../actions';
import axios from 'axios';


export default function Add_todo() {
    const [item, setItem] = React.useState('')

    const dispatch = useDispatch();


    const onChangeItem = (e) => {
        setItem(e.target.value)
      }
    const onSubmitHandler = (e) =>{
        dispatch(setTodo(item))
        // // if(e.key==="Enter"){
        //     if((item.length>0) && (item.match(/[a-z]/i))){
        //         axios
        //         .post('http://localhost:3030/todo',({
        //             'text':item,
        //             'done':false
        //             }))
        //         .then((data)=>{
        //             console.log('todos sent to backend',data.data)
        //             setItem('')
        //             dispatch(setTodo(data.data))
        //             })
        //         .catch((err)=>{
        //             console.log('err in sending todo to backend',err)
        //             })
        //     }
        // // }
    }
    
    return (
        <div>
            <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmitHandler(e)
                    // dispatch(setTodo(item))
                    }
                }>
                <input 
                    type="text" 
                    value={item}
                    autoFocus
                    onChange={onChangeItem}
                />
                <button 
                    type="submit">
                    submit
                </button>
            </form>
        </div>
    )
}
