'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDesc_Transaction extends jsTPS_Transaction {
    constructor(app, wspace, itemState, item , name, oldname) {
        super();
        this.app = app;
        this.workspace = wspace;
        // this.itemBefore = JSON.parse(JSON.stringify(item));
        this.name=name;
        this.itemState = itemState;
        this.item = item;
        this.oldname=oldname
        

    }

    doTransaction = () => {

        console.log(this.oldname)
        this.itemState.setState({
            description: this.name
        })
        this.item.description = this.name
      
       
    }


    undoTransaction = () => {
        
        this.itemState.setState({
            description: this.oldname
        })
        this.item.description = this.oldname
        
        
        
    }
}