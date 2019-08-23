import React, { Component } from 'react';
import './Status.css';
export class Status extends Component {
    render() {
        return (
            <div className="status">
                <div>Total : {this.props.total}</div>
                <div>Done : {this.props.done} </div>
                <div>Pending : {this.props.pending}</div>
            </div>
        )
    }
}

export default Status
