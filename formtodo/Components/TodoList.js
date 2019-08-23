import React, { Component } from 'react';
import './TodoList.css'
export class TodoList extends Component {
    constructor(props) {
        super(props)
        this.onClickBox = this.onClickBox.bind(this);
    }
    
    onClickBox(event){
        document.getElementById(event.target.id).style.display="none";
        document.getElementById(event.target.id+'done').style.display="block";
        console.log(event.target.id)
        this.props.doneData(this.props.Done+1)
    }

    render() {
        var listData = this.props.List;
        var mainData = listData.map((e,i)=>
            <li key={i}>
            <span className="donebox" id={i+'done'}>☑</span> 
            <span className="box" id={i} onClick={this.onClickBox}>☐</span> 
            {e}</li>
        )
        return (
            <div>
                {mainData}
            </div>
        )
    }
}

export default TodoList
