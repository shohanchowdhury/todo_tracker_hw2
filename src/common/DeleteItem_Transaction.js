'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(app,wspace,toDoListItems,index) {
        super();
        this.app = app;
        this.workspace = wspace;
        this.todoBefore = JSON.parse(JSON.stringify(toDoListItems));
        this.id=index;
        this.todoList = toDoListItems;
        this.removedItem = "";
        

        

    }

    doTransaction = () => {
        // MAKE A NEW ITEM
        // this.itemAdded = this.model.addNewItem();
        // console.log(this.todoList);
        
        // this.todoList[this.id]=this.newItem
        // this.workspace.setState({
        //     toDoListItems: this.todoList.toDoListItems
        // })
        this.removedItem = this.todoList[this.id]
        // console.log(this.removedItem)
        this.todoList.splice(this.id, 1)
        this.workspace.setState({
            toDoListItems: this.todoList

        // console.log(this.todoList);
        // console.log(this.todoBefore);
        })
    }

    undoTransaction = () => {
        this.todoList.splice(this.id, 0, this.removedItem)
        this.workspace.setState({
            toDoListItems: this.todoBefore.toDoListItems
        })
        
        
        
    }
}