// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.toDoList.name
        }
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }
    

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        // console.log(this.props.toDoList.name)
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    

    handleDoubleClick = () => {
        
        this.setState({
            name: <input type="text" onBlur={this.changeListName}/>
        })
        // this.props.toDoListItem.description = <input></input>;
        // console.log(this.props.toDoListItem.description);
        
        
    }

    changeListName = event =>{
        if(event.target.value){
            this.setState({
                name: event.target.value
            })
            this.props.toDoList.name = event.target.value
        }
        else{
            this.setState({
                name: this.props.toDoList.name
            })
        }
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div 
                className='todo-list-button'
                onClick={this.handleLoadList}
                onDoubleClick={this.handleDoubleClick}
            >
                {this.state.name}<br />
            </div>
        )
    }
}

export default ListLink;