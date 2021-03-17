import React from 'react';
import '../css/Modal.css'

export const Modal = () =>{
    return (
        <div className="modal-wrapper">
            <div className="modal-header">
                <p>Are you sure you want to delete?</p>
                <span className= "close-modal"> x</span>
            </div>
            <div className="modal-content">
                <div className="modal-body">
                    
                </div>
                <div className="modal-footer">
                    {/* <button className ="cancel-modal">Close</button> */}
                    <button className ="okay-modal">Confirm</button>
                </div>
            </div>
        </div>
    )
}