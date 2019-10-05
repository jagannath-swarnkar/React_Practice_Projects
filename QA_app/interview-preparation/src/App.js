import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Headers from './Components/Headers';
import Question from './Components/Question';

import QAlist from './Components/QAlist'

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      item:'',
      ansItem:'',
      editId:'',
       ques:[],
       ans:[]
    }
  }

  UNSAFE_componentWillMount(){     
      axios
      .get('http://localhost:4000/get')
      .then((result)=>{
        this.setState({ques:result.data})
      })
      .catch((err)=>{
        console.log('err in getting ques in willmount',err)
      })

      axios
      .get('http://localhost:4000/getAns')
      .then((result)=>{
        this.setState({ans:result.data})
      }).catch((err)=>{
        console.log('err in getting answer in will mount',err)
      })
  }

  onChangeHandler=(e)=>{
    this.setState({
        item:e.target.value
    })
  }
  ansChangeHandler=(e)=>{
    this.setState({editId:e.target.id,ansItem:e.target.value})
  }

  addQues=(e)=>{
    if(e.key==='Enter'){
      // console.log('this is ques',e.target.value)
      if(e.target.value.length>0){
        axios
        .post('http://localhost:4000/question',{Question:e.target.value})
        .then((data)=>{console.log('data sent to backned ',data.data);
          this.setState({ques:data.data,item:''})
          })
        .catch((err)=>{console.log('err in sending data into the database ',err)})
      }
    }
  }

  addAns=(e)=>{
    if(e.key==='Enter'){
      if(e.target.value.length>0){
      axios
      .post('http://localhost:4000/answer',{Q_id:e.target.id,answer:e.target.value})
      .then((result)=>{
        // console.log('ans sent to backed',result.data)
        var ansIns=this.state.ans;
        var l = result.data.length-1;
        ansIns.push(result.data[l])
        this.setState({ans:ansIns,ansItem:'',editId:''})
      })
      .catch((err)=>{console.log('err in sending ans into backend',err)})
    }
  }
  }
  
  render() {
    return (
      <div className="app">
        <Headers/>
        <Question addQues={this.addQues} 
                  item={this.state.item}
                  onChangeHandler={this.onChangeHandler}
                  
                  /> 
        <QAlist Qlist={this.state.ques} 
                ans={this.state.ans} 
                addAns={this.addAns}
                ansItem={this.state.ansItem}
                editId={this.state.editId}
                ansChangeHandler={this.ansChangeHandler} 
                />  
      </div>
    )
  }
}

export default App
