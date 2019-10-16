import React from 'react';
import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import {increment,decrement} from './actions'
import Add_todo from './Components/Add_todo';
import Counter from './Components/demo';

function App() {
  const counter = useSelector(state=> state.counter)
  const todo = useSelector(state => state.todo)
  const dispatch = useDispatch();


  return (
    <div className="App">
      <h1>counter : {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement(3))}>-</button><br/><br/>
      <Add_todo/>
      <div>
        <Counter />
      </div>
      <hr/>
      {todo.map((e,i)=>{
        return (
          <div>
          <li>{e}</li><hr/>
          </div>
        )
      })}
    </div>
  );
}

export default App;