import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "modal">
            <div className = "modal-content">
                <div className = "modal-header">
                    <h4 className = "modal-title">Modal Title</h4>
                </div>
                <div className = "modal_body">This is Modal Content
                </div>
                <div className = "modal-footer">
                    <button className ="button">Close</button>
                </div>
            </div>
        </div>
        );
    }
}

export default Modal