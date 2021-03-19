'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(app, wspace, toDoListItems, newItem, id) {
        super();
        this.app = app;
        this.workspace = wspace;
        this.todoBefore = JSON.parse(JSON.stringify(toDoListItems));
        this.todoList = toDoListItems;
        this.newItem = newItem;
        this.id = id;

        

    }

    doTransaction = () => {
        // // MAKE A NEW ITEM
        this.todoList.push(this.newItem)
        this.workspace.setState({
            toDoListItems: this.todoBefore.toDoListItems
        })

        console.log(this.id)

    }

    undoTransaction = () => {
        // console.log(this.todoList)
        // console.log(this.todoBefore)
        
        // console.log(this.removedItem)
        console.log(this.id)

        

        this.todoList.splice(this.todoList.indexOf(this.newItem), 1)
        this.workspace.setState({
            toDoListItems: this.todoList
        })

    
    }
}