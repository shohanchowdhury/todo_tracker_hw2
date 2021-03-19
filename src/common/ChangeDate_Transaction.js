'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDate_Transaction extends jsTPS_Transaction {
    constructor(app, wspace, itemState, item , date, olddate) {
        super();
        this.app = app;
        this.workspace = wspace;
        // this.itemBefore = JSON.parse(JSON.stringify(item));
        this.itemState = itemState;
        this.item = item;
        this.date=date;
        this.olddate=olddate
        

    }

    doTransaction = () => {

        console.log(this.oldname)
        this.itemState.setState({
            date: this.date
        })
        this.item.due_date = this.date
      
       
    }


    undoTransaction = () => {
        
        this.itemState.setState({
            date: this.olddate
        })
        this.item.due_date = this.olddate
        
        
        
    }
}