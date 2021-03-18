// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import { Modal } from './Modal'

class Workspace extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            toDoListItems:this.props.toDoListItems
        }

        console.log(this.state.toDoListItems)
    }

    
    handleAddNewItem = () =>{

       // NEED TO FIX LIST WITH 0 ELEMENTS 
        
        if(typeof this.props.getLoadListName()!=="undefined"){
            console.log("this.props.toDoListItems.length")


            let a = this.props.toDoListItems[this.props.toDoListItems.length-1];
            var nextId
            if( typeof a === "undefined" ){
                nextId=0;
            }
            else{
                var nextId = a.id+1;
            }

            

            // if(this.props.toDoListItems.length>0){
                console.log(this.props.toDoListItems)

                let newItem = this.props.addNewItemCallback2(nextId)
                
                console.log(this.props.toDoListItems[this.props.toDoListItems.length]=newItem)
                this.setState({
                    toDoListItems: this.props.toDoListItems
                })
                
                console.log(this.props.toDoListItems)
            // }

            
            
        }
    }

    handleCloseList = () => {
        this.props.closeList();
    }

    handleDeleteList = () => {
        this.props.deleteList();
    }

    
    deleteItemW = (item) =>{
        let a = item.id;
        console.log(a);
        // for(a; a<this.props.toDoListItems.length-1; a++){
        //     this.props.toDoListItems[a] = this.props.toDoListItems[a+1]
        // }
        var array = this.props.toDoListItems;
        var index = array.indexOf(item)
        this.props.toDoListItems.splice(index, 1)
        this.setState({
            toDoListItems: this.props.toDoListItems
        })

    }

    moveUpItemW = (item) => {

        var array = this.props.toDoListItems;

        if(array.indexOf(item)!==0){
            
        
            let first = array.indexOf(item)-1;
            let second = array.indexOf(item);
            let temp = this.props.toDoListItems[first];
            this.props.toDoListItems[first]=this.props.toDoListItems[second];
            this.props.toDoListItems[second]=temp;
            
            this.setState({
                toDoListItems: this.props.toDoListItems
            })

        }

    }

    moveDownItemW = (item) => {

        var array = this.props.toDoListItems;

        if(array.indexOf(item)!==(array.length-1)){

            array = this.props.toDoListItems;
            let first = array.indexOf(item);
            let second = array.indexOf(item)+1;
            let temp = this.props.toDoListItems[second];
            this.props.toDoListItems[second]=this.props.toDoListItems[first];
            this.props.toDoListItems[first]=temp;

            this.setState({
                toDoListItems: this.props.toDoListItems
            })
        }
    }

    isFirst = (item) =>{
        let array = this.props.toDoListItems;

        if(array.indexOf(item)===0){
            return true;
        }
        return false;
    }

    isLast = (item) =>{
        let array = this.props.toDoListItems;

        if(array.indexOf(item)===(array.length-1)){
            return true;
        }
        return false;
    }

    updateStorage = () =>{
        this.props.updateStorage()
    }



    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox 
                            id="add-item-button"
                            className="list-item-control material-icons todo-button" 
                            onClick={this.handleAddNewItem}
                            />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={this.handleDeleteList}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={this.handleCloseList} />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                            
                        <ToDoItem
                            isFirst={this.isFirst}
                            isLast={this.isLast}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            deleteItemWork={this.deleteItemW}
                            moveUpItemWork={this.moveUpItemW}
                            moveDownItemWork={this.moveDownItemW}
                            updateStorage={this.updateStorage}

                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;