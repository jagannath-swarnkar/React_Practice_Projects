import React, {Component} from 'react';
import './App.css'
import Stats from './Stats';
import Todo from './Todo';
import List from './todoList';


export default class App extends Component{

    constructor(){
        super()
        this.state = {
            item:'',
            itemList:[],
            defaultList:'total',
        }
    }
    onChangeHandler = (e) => {
        this.setState({
            item:e.target.value
        })
    }

    addItem = () => {
        if(this.state.item.length>0){
            let itemList = this.state.itemList;
            itemList.push({
                text:  this.state.item,
                done: false
            });
            this.setState({
                itemList:itemList,
                item:''
            });
        }
    }

    checkbox = (e) => {
        var index = e.target.id;
        const itemList = this.state.itemList;
        for(var i in itemList){
            console.log(i,e.target.id);
            
            if(itemList[i].text===e.target.id){
                itemList[i].done = true;
                this.setState({ itemList });
            }
        }
    }

    listShouldbe = (e) =>{ 
        if(e.target.dataset.id==='pending'){
        this.setState({ defaultList:e.target.dataset.id })
        }
        else if(e.target.dataset.id==='done'){
            this.setState({ defaultList:e.target.dataset.id })
        }
        else{
            this.setState({ defaultList:e.target.dataset.id })
        }
    }

    render(){
        return (
            <div>
                <Stats listShouldbe={this.listShouldbe} itemList={this.state.itemList} />
                <Todo  todo={this.state.item} onChangeHandler={this.onChangeHandler} addItem={this.addItem}/>
                <List  checkbox={this.checkbox} itemList={this.state.itemList} defaultList={this.state.defaultList} checked={this.state.checked}/>
            </div>
        )
    }
}