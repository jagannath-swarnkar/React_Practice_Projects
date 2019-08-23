import './App.css';
import React, { Component } from 'react';
import Status from './Status';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       item:"",
       done:0,
       total:0,
       List:[]
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addData = this.addData.bind(this);
    this.totalData = this.totalData.bind(this);
    this.doneData = this.doneData.bind(this);
  }

  onChangeHandler(data){
    this.setState({
        item:data.value
    })
    // console.log(this.state.item);
    
    
}
addData(Item){
  var listIns = this.state.List;
  listIns.push(Item);  
  this.setState({
    List:listIns,
    item:""
  })
  
}
totalData(Total){
  this.setState({
    total:Total
  })
}
doneData(Done){
  this.setState({
    done:Done
  })
}


  render() {
    
    return (
      <div className="todo">
        <div className="header">
          <Status total={this.state.total} done={this.state.done} pending={this.state.total-this.state.done}/>
        </div>
        <div className="addData">
          <AddTodoForm Total={this.state.total} totalData={this.totalData} value={this.state.item} triggerParentUpdate={this.onChangeHandler} triggerParentUpdate2={this.addData} />
        </div>
        <div className="todolist">
          <TodoList List = {this.state.List} Done={this.state.done} doneData={this.doneData} />
        </div>
      </div>
    )
  }
}

export default App
