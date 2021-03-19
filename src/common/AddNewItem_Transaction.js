'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(app,id,todoList,allTodoLists,newToDoListItem,wspace) {
        super();
        this.app = app;
        this.todoList = todoList;
        this.todoBefore = JSON.parse(JSON.stringify(todoList));
        this.todoBeforeitems = JSON.parse(JSON.stringify(this.todoList.items));
        this.id=id;
        this.newItem = newToDoListItem;
        this.workspace = wspace;

        

    }

    doTransaction = () => {
        // // MAKE A NEW ITEM
        console.log("HEY")

        console.log(this.newItem)
        // console.log(this.todoList.items[2])
        console.log(this.todoList.items.length)
        this.todoList.items[this.todoList.items.length]=this.newItem

        

        // this.todoList.push(this.newItem)

        // // this.itemAdded = this.model.addNewItem();
        // // console.log(this.todoList);
        // this.todoList.push(this.newItem)
        // this.workspace.setState({
        //     toDoListItems: this.todoList.toDoListItems
        // })
        // // console.log(this.todoList);
        // // console.log(this.todoBefore);


    }

    undoTransaction = () => {
        // console.log(this.todoList)
        // console.log(this.todoBefore)
        
        this.todoList.items=this.todoBeforeitems

        this.app.setState({
            currentList: this.todoList
        })

        // this.todoList.items[this.todoList.items.length-1]=""
        console.log(this.todoList.items)


        // this.todoList.splice(this.id,1)
        // this.workspace.setState({
        //     toDoListItems: this.todoBefore.toDoListItems
        // })

        console.log("WAY")
        
        
        
    }
}