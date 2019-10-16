import React, { Component } from 'react';
import { connect } from 'react-redux';
import {increment,decrement} from '../actions';




class Counter extends Component {

increment = () => ({ type: 'INCREMENT' })
decrement = () => ({ type: 'DECREMENT' })

  render() {

    return (
      <div className="App" >
          {this.props.number}
        <hr/>
            <button onClick={this.props.increment} type="button" >+</button>
            <button onClick={this.props.decrement} type="button" >-</button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.counter
  };
}
const mapDispatchToProps = dispatch => {
    return {
      // dispatching actions returned by action creators
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Counter);