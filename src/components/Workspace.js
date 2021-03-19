// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import Modal from './Modal';
import { ThumbUpSharp } from '@material-ui/icons';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoListItems:this.props.toDoListItems,
            show:false
        }
        console.log(this.state.toDoListItems)
        
    }
    

    
    showModal = () => {
        // console.log(JSON.stringify(this.props.currentList))
        if(JSON.stringify(this.props.currentList)!=="{\"items\":[]}"){
            this.setState({ show: true });
        }
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };


      

    handleAddNewItem = () =>{

       // NEED TO FIX LIST WITH 0 ELEMENTS 

       console.log(this.props.toDoListItems)
       console.log(this.state.toDoListItems)
       console.log(this.props.toDoLists)

    //    for (var i = 0; i < this.props.toDoLists.length; i++) {
    //     console.log(this.props.toDoLists[i])
    //     console.log(this.props.toDoLists[i].items)
    //     for (var j = 0; j < this.props.toDoLists[i].items.length; j++)
    //         console.log(this.props.toDoLists[i].items[j].id)
    //         if (b<this.props.toDoLists[i].items[j].id){
    //             b=1
    //         }
    //     } 
    //     console.log(b)
        

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
                console.log(this)

                // this.props.addNewItemCallback2(this,nextId,this.state.toDoListItems)


                
                // // console.log(this.props.toDoListItems[this.props.toDoListItems.length]=newItem)
                // this.setState({
                //     toDoListItems: this.props.toDoListItems
                // })

                
                this.props.addNewItemCallback2(this,this.props.toDoListItems)

                

                console.log(this.props.toDoListItems)
            // }

            
            
        }
    }

    updateState = () => {
        console.log("DSAASD")
        this.setState({
            show:this.state.show
        })
    }

    

    componentDidMount(){
        document.addEventListener('keydown',this.keydownHandler);
    }
      componentWillUnmount(){
        document.removeEventListener('keydown',this.keydownHandler);
    }



    handleCloseList = () => {
        this.props.closeList();
    }

    handleDeleteList1 = () => {
        this.showModal()
        
    }

    handleDeleteList2 = () => {

        this.hideModal()
        this.props.deleteList();    
    }

    printnothing = () => {
        console.log("Maybe")
    }

    deleteS = (e) => {
        this.setState({
            toDoListItems:e
        })
    }
    
    deleteItemW = (item) =>{
        let a = item.id;
        console.log(a);

        // for(a; a<this.props.toDoListItems.length-1; a++){
        //     this.props.toDoListItems[a] = this.props.toDoListItems[a+1]
        // }
        var array = this.props.toDoListItems;
        var index = array.indexOf(item)

        // nextId,this.props.toDoListItems,this

        // this.props.toDoListItems.splice(index, 1)
        // this.setState({
        //     toDoListItems: this.props.toDoListItems
        // })

        this.props.deleteItem(this, this.props.toDoListItems, index);



        

    }

    moveUpItemW = (item) => {

        var array = this.props.toDoListItems;

        if(array.indexOf(item)!==0){
            
        
            let first = array.indexOf(item)-1;
            let second = array.indexOf(item);
            let temp = this.props.toDoListItems[first];
            

            this.props.moveUpItem(this,array,first,second,temp)
            
            

        }

    }

    moveDownItemW = (item) => {

        var array = this.props.toDoListItems;

        if(array.indexOf(item)!==(array.length-1)){

            

            let first = array.indexOf(item);
            let second = array.indexOf(item)+1;
            let temp = this.props.toDoListItems[second];
            

            this.props.moveDownItem(this,array,first,second,temp)

            // array = this.props.toDoListItems;
            // let first = array.indexOf(item);
            // let second = array.indexOf(item)+1;
            // let temp = this.props.toDoListItems[second];

            // this.props.toDoListItems[second]=this.props.toDoListItems[first];
            // this.props.toDoListItems[first]=temp;

            // this.setState({
            //     toDoListItems: this.props.toDoListItems
            // })
        }
    }

    changeDesc = (itemSpace, item,name,oldname) =>{
        this.props.changeDesc(this,itemSpace, item,name,oldname)
        
    }

    changeDate = (itemSpace, item,date,olddate) =>{

        this.props.changeDate(this,itemSpace, item,date,olddate)
        
    }

    changeStatus = (itemSpace, item,status, oldstatus) =>{

        this.props.changeStatus(this,itemSpace, item,status,oldstatus)
        
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

    undoAddTransac = () =>{
        this.props.undoAddNewTransac();
        this.updateState()
    }

    redoAddNewTransac = () =>{
        this.props.redoAddNewTransac();
        this.updateState()
    }

    updateStorage = () =>{
        this.props.updateStorage()
    }

    hasUndo = () =>{
        return(this.props.tps.hasTransactionToUndo())
    }

    hasRedo = () =>{
        return(this.props.tps.hasTransactionToRedo())    
    }

    hasCurrentList = () =>{
        return(JSON.stringify(this.props.currentList)!=="{\"items\":[]}")
    }

    keydownHandler = (e) =>{
        
        // this.undoAddNewTransac()
        if(e.keyCode===90 && e.ctrlKey){
            this.undoAddTransac()
            this.setState({
                show:this.state.show
            })
            
        }
        if(e.keyCode===89 && e.ctrlKey){
            this.redoAddNewTransac()
            this.setState({
                show:this.state.show
            })
        }
    }

    render() {
        return (
            <div id="workspace">

                <div id="myModal" className="modal" style={!(this.state.show) ? {display: 'none'} : { color: 'block' }}>
                <input type="text" id="one" onKeyPress={this.handleKeyPress} />
                    <div className="modal-content" >
                        <span id="close-modal" className="close" onClick={this.hideModal} >&times;</span>
                        <p>Are you sure you want to delete?</p>
                        <span id="okay-delete-button" className="okay-delete-button" onClick={this.handleDeleteList2}>Confirm </span>
                        <span id="dont-delete-button" className="dont-delete-button" onClick={this.hideModal}>Cancel</span>
                    </div>
                </div>


                <div id="todo-list-header-card" className="list-item-card">
                    
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" style={!(this.hasUndo()) ? {color: '#180C22'} : { color: 'white' }} onClick={this.undoAddTransac}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" style={!(this.hasRedo()) ? {color: '#180C22'} : { color: 'white' }}onClick={this.redoAddNewTransac}/>
                        <AddBox 
                            id="add-item-button"
                            className="list-item-control material-icons todo-button" 
                            onClick={this.handleAddNewItem}
                            style={!(this.hasCurrentList()) ? {display:"none"} : {}}
                            />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" style={!(this.hasCurrentList()) ? {display:"none"} : {}} onClick={this.showModal}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" style={!(this.hasCurrentList()) ? {display:"none"} : {}} onClick={this.handleCloseList} />
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
                            changeDesc={this.changeDesc}
                            changeDate={this.changeDate}
                            changeStatus={this.changeStatus}
                            updateState={this.updateState}


                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;