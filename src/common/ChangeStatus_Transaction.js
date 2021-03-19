'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(app, wspace, itemState, item , status, oldstatus) {
        super();
        this.app = app;
        this.workspace = wspace;
        // this.itemBefore = JSON.parse(JSON.stringify(item));
        this.itemState = itemState;
        this.item = item;
        this.status=status;
        this.oldstatus=oldstatus
        

    }

    doTransaction = () => {

        this.itemState.setState({
            status: this.status
        })
        this.item.status = this.status

        
      
       
    }


    undoTransaction = () => {
        
        this.itemState.setState({
            status: this.oldstatus
        })
        this.item.status = this.oldstatus
        
        
        
    }
}