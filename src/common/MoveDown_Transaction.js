'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveDown_Transaction extends jsTPS_Transaction {
    constructor(app,wspace,toDoListItems,first,second,temp) {
        super();
        this.app = app;
        this.workspace = wspace;
        this.todoBefore = JSON.parse(JSON.stringify(toDoListItems));
        this.first=first;
        this.todoList = toDoListItems;
        this.second = second;
        this.temp = temp;
        

    }

    doTransaction = () => {


        this.todoList[this.second]=this.todoList[this.first];
        this.todoList[this.first]=this.temp;
      
        this.workspace.setState({
            toDoListItems: this.todoList
        })
    }


    undoTransaction = () => {
        
        this.todoList[this.first]=this.todoList[this.second];
        this.todoList[this.second]=this.temp;
      
        this.workspace.setState({
            toDoListItems: this.todoList
        })
        
        
        
    }
}