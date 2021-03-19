// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO
import AddNewItem_Transaction from './common/AddNewItem_Transaction'
import DeleteItem_Transaction from './common/DeleteItem_Transaction'
import MoveUp_Transaction from './common/MoveUp_Transaction'
import MoveDown_Transaction from './common/MoveDown_Transaction'
import ChangeDesc_Transaction from './common/ChangeDesc_Transaction'
import ChangeDate_Transaction from './common/ChangeDate_Transaction'
import ChangeStatus_Transaction from './common/ChangeStatus_Transaction'








// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Modal from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);
    
    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    // console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    var highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        // console.log(toDoListItem)
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
      
    }
    
  }
  

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });

    console.log(this.state.currentList);

    
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    newToDoListInList.id = this.state.nextListId;
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];
    newToDoList.id = this.state.nextListId
    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
      
    },
    
    this.afterToDoListsChangeComplete);
  }


  getLoadListName = () => {
    return this.state.currentList.name;
}

  closeList = () => {
    this.setState({
      currentList: {items: []},
    })

  }

  deleteList = () => {
    console.log(this.state.toDoLists)
    console.log(this.state.currentList.id)
    console.log("HOOOHHAAA")


    var array = this.state.toDoLists;
    var index = array.indexOf(this.state.currentList)
    console.log(index)
    array.splice(index, 1)
    this.setState({
      toDoLists: array,
      currentList: {items: []},
    })
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }


  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: "",
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  makeNewToDoListItem2 = (wspace,nextId,toDoListItems,) =>  {
    
    // this.props.addNewItemCallback2(nextId,this.props.toDoListItems,this)
    let highListId = -1;
    var highListItemId = -1;
    for (let i = 0; i < this.state.toDoLists.length; i++) {
      let toDoList = this.state.toDoLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        // console.log(toDoListItem)
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    }
    
    nextId=highListItemId+1
    let newToDoListItem = {
      id: nextId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    let transaction = new AddNewItem_Transaction(this,nextId,this.state.currentList,this.state.toDoLists,newToDoListItem,wspace)
    this.tps.addTransaction(transaction)

  
  }

  hasUndo(){
    return(this.tps.hasTransactionToUndo())
  }
  hasRedo(){
    return(this.tps.hasTransactionToRedo())
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log(this.state.toDoLists)
    console.log("App updated currentToDoList: " + this.state.currentList);
    
    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);

    
  }

  // addNewTransac = (e) => {
  //   console.log(e);
  //   let transaction = new AddNewItem_Transaction(this)
  //   console.log("HOOOHHAAA")
  //   this.tps.addTransaction(transaction)

  // }

  undoAddNewTransac = () =>{
    this.tps.undoTransaction();

  }

  redoAddNewTransac = () =>{
    this.tps.doTransaction();

  }

  printnothing = () => {
  }

  deleteItem = (wspace, toDoListItems, index) => {
    let transaction = new DeleteItem_Transaction(this,wspace,toDoListItems,index)
    this.tps.addTransaction(transaction)

  }


  moveUpItem = (wspace, toDoListItems ,first,second,temp) => {
    let transaction = new MoveUp_Transaction(this,wspace,toDoListItems,first,second,temp)
    this.tps.addTransaction(transaction)

  }

  moveDownItem = (wspace, toDoListItems ,first,second,temp) => {
    let transaction = new MoveDown_Transaction(this,wspace,toDoListItems,first,second,temp)
    this.tps.addTransaction(transaction)


  }

  changeDesc = (wspace, itemSpace, item , name,oldname) => {
    let transaction = new ChangeDesc_Transaction(this,wspace,itemSpace,item,name,oldname)
    this.tps.addTransaction(transaction)
  } 

  changeDate = (wspace, itemSpace, item , date, olddate) => {
    let transaction = new ChangeDate_Transaction(this,wspace,itemSpace,item,date,olddate)
    this.tps.addTransaction(transaction)
  } 

  changeStatus = (wspace, itemSpace, item , status, oldstatus) => {
    let transaction = new ChangeStatus_Transaction(this,wspace,itemSpace,item,status,oldstatus)
    this.tps.addTransaction(transaction)
  } 

  restoreStorage = (e) =>{

  }


  updateStorage =  () => {
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
        
  }

  render() {
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          currentList={this.state.currentList}
        />
        <Workspace 
        toDoListItems={items} 
        addNewItemCallback={this.makeNewToDoListItem}
        addNewItemCallback2={this.makeNewToDoListItem2}
        getLoadListName={this.getLoadListName}
        closeList={this.closeList}
        deleteList={this.deleteList}
        updateStorage={this.updateStorage}
        addNewTransac={this.addNewTransac}
        undoAddNewTransac={this.undoAddNewTransac}
        redoAddNewTransac={this.redoAddNewTransac}
        deleteItem={this.deleteItem}
        moveUpItem={this.moveUpItem}
        moveDownItem={this.moveDownItem}
        changeDesc={this.changeDesc}
        changeDate={this.changeDate}
        changeStatus={this.changeStatus}
        toDoLists={this.state.toDoLists}
        hasUndo={this.hasUndo}
        hasRedo={this.hasRedo}
        tps={this.tps}
        currentList={this.state.currentList}
        
        />
      </div>
    );
  }
}

export default App;