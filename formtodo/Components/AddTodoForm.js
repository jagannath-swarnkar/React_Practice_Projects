import React, { Component } from 'react'
import './AddTodoForm.css'
export class AddTodoForm extends Component {
    constructor(props) {
        super(props)
    
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
   onChangeHandler(event){
    var data = event.target;
    this.props.triggerParentUpdate(data);
   } 
   onSubmitHandler(event){
    var Item = event.target.value;    
    this.props.triggerParentUpdate2(Item);
    var a=(this.props.Total+1);
    
    this.props.totalData(a)
   }
   
   
    render() {
        return (
            <div className="addtodo">
               <div id="d1"><input type="text" name="input" onChange={this.onChangeHandler} value={this.props.value} /></div>
               <div id="d2"><button onClick={this.onSubmitHandler} value={this.props.value} >Add</button></div>
            </div>
        )
    }
}

export default AddTodoForm
