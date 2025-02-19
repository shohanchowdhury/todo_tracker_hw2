// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        let listItem = this.props.toDoListItem;
        this.state = {
            id: listItem.id,
            description: listItem.description,
            date: listItem.due_date,
            status: listItem.status,
            firstItem: false,
            lastItem: false,
            oldname: listItem.description,
            olddate: listItem.due_date,
            oldstatus: listItem.status,
            
            
        }
        // DISPLAY WHERE WE ARE
        
    }
    



    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    
    handleClickDesc = () => {

        console.log(this.props.toDoListItem);

        if(typeof this.props.toDoListItem.description === 'string'){
            this.setState({
                oldname:this.props.toDoListItem.description
            })
        }
        this.props.toDoListItem.description = <input type="text" onBlur={this.changeDesc}/>

        this.setState({
            description: <input type="text" onBlur={this.changeDesc}/>
        })



        // this.props.toDoListItem.description = <input></input>;
        // console.log(this.props.toDoListItem.description);
        
        
    }

   
    handleClickDate = () => {
        if(typeof this.props.toDoListItem.due_date === 'string'){
            this.setState({
                olddate:this.props.toDoListItem.due_date
            })
        }

        this.setState({
            date: <input type="date" onBlur={this.changeDate}/>
        })

        this.props.toDoListItem.due_date = <input type="date" onBlur={this.changeDate}/>
        
        
    
    }

    handleClickStatus = () => {
        if(typeof this.props.toDoListItem.status === 'string'){
            this.setState({
                oldstatus:this.props.toDoListItem.status
            })
        }

        this.props.toDoListItem.status = <select onBlur={this.changeStatus}> 
        <option value = "complete">complete</option>
        <option value = "incomplete">incomplete</option>
        
    </select> 
        
        this.setState({
            status: <select onBlur={this.changeStatus}> 
                <option value = "complete">complete</option>
                <option value = "incomplete">incomplete</option>
                
            </select> 
        })
    
    }


    changeDesc = event =>{


        if(event.target.value){
            
            this.props.changeDesc(this,this.props.toDoListItem,event.target.value,this.state.oldname)

            // this.setState({
            //     description: event.target.value
            // })
            // this.props.toDoListItem.description = event.target.value

            this.props.updateState();

        }
        else{
            this.setState({
                description: this.props.toDoListItem.description
            })
        }

        
        if(JSON.stringify(this.props.toDoListItem.description)==="{\"type\":\"input\",\"key\":null,\"ref\":null,\"props\":{\"type\":\"text\"},\"_owner\":null,\"_store\":{}}"){
            this.setState({
                name: this.state.oldname
            })
            this.props.toDoListItem.description = this.state.oldname
        }

    }


    changeDate = event =>{


        if(event.target.value){

            this.props.changeDate(this,this.props.toDoListItem,event.target.value,this.state.olddate)

            // this.setState({
            //     date: event.target.value
            // })
            // this.props.toDoListItem.due_date = event.target.value

            this.props.updateState();

        }
        else{
            this.setState({
                date: this.props.toDoListItem.due_date
            })
        }

        if(JSON.stringify(this.props.toDoListItem.due_date)==="{\"type\":\"input\",\"key\":null,\"ref\":null,\"props\":{\"type\":\"date\"},\"_owner\":null,\"_store\":{}}"){
            this.setState({
                date: this.state.olddate
            })
            this.props.toDoListItem.due_date = this.state.olddate
        }

        

    }

    changeStatus = event =>{
        if(event.target.value){

            this.props.changeStatus(this,this.props.toDoListItem,event.target.value,this.state.oldstatus)

            // this.setState({
            //     status: event.target.value
            // })
            // this.props.toDoListItem.status = event.target.value

            this.props.updateState();

        }
        else{
            this.setState({
                status: this.props.toDoListItem.status
            })
        }

        console.log(JSON.stringify(this.props.toDoListItem.status))
        if(JSON.stringify(this.props.toDoListItem.status)==="{\"type\":\"select\",\"key\":null,\"ref\":null,\"props\":{\"children\":[{\"type\":\"option\",\"key\":null,\"ref\":null,\"props\":{\"value\":\"complete\",\"children\":\"complete\"},\"_owner\":null,\"_store\":{}},{\"type\":\"option\",\"key\":null,\"ref\":null,\"props\":{\"value\":\"incomplete\",\"children\":\"incomplete\"},\"_owner\":null,\"_store\":{}}]},\"_owner\":null,\"_store\":{}}"){
            this.setState({
                status: this.state.oldstatus
            })
            this.props.toDoListItem.status = this.state.oldstatus
        }
    }

    deleteItem = (e) => {
        this.props.deleteItemWork(this.props.toDoListItem)
    }

    moveUpItem = (e) => {
        this.props.moveUpItemWork(this.props.toDoListItem)

    }

    moveDownItem = (e) => {
        this.props.moveDownItemWork(this.props.toDoListItem)
    }

    checkFirst = (e) => {
        if(this.props.isFirst(this.props.toDoListItem)){
            // this.setState({
            //     firstItem: true
            // })
            return true;
        }
        else{
            return false;

        }
    }

    checkLast = (e) => {
        if(this.props.isLast(this.props.toDoListItem)){
            // this.setState({
            //     LastItem: true
            // })
            return true
        }
        else{
            return false;
        }
    }

    checkIsComplete = (e) => {
        if(this.state.status==="complete"){
            return true
        }
        return false
    }

    updateStorageItem = () => {
        this.props.updateStorage();
    }


    render() {
        // DISPLAY WHERE WE ARE
        this.updateStorageItem();

        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        // if(this.checkFirst()){
        //     console.log("HMMM")

        // }
        // if(this.checkLast()){
        //     console.log("UUUHMMM")
            
        // }
        let statusType = "status-complete";
        if (listItem.status === "incomplete"){
            statusType = "status-incomplete";
        }

        
        
        return (
            
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <div className='item-col task-col' onClick={() => this.handleClickDesc()}>{listItem.description}</div>
                <div className='item-col due-date-col' onClick={() => this.handleClickDate()}>{listItem.due_date}</div>
                <div className='item-col status-col' style={!(this.checkIsComplete()) ? {color: '#E9CE2C'} : { color: '#3B6FFA' }} onClick={() => this.handleClickStatus()}>{listItem.status}</div>
                {/* <div className='item-col status-col' className={statusType}>{listItem.status}</div> */}
                {/* <div className='item-col test-4-col'></div> */}
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp style={!(this.checkFirst()) ? {} : { backgroundColor: '#353a44', color: "#484848" }} className='list-item-control todo-button'  onClick={() => this.moveUpItem()}/>
                    <KeyboardArrowDown style={!(this.checkLast()) ? {} :  { backgroundColor: '#353a44', color: "#484848" }} className='list-item-control todo-button' onClick={() => this.moveDownItem()}/>
                    <Close className='list-item-control todo-button' onClick={() => this.deleteItem()} />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;