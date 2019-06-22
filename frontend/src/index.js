import React, { Component } from 'react';
import { render } from 'react-dom';
import "./style.css"
import DoItem from './DoItem'
import todoData from './DoData'
// import { async } from 'q';

function NewToDo(props) {
  return (
    <div className="elementStyle">
      <input id="newTask" className="newTaskStyle" placeholder="Add new task" />
      <button className="addButtonStyle" onClick={props.click}>Add</button>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: null,
      arranged: null,
      selected: "showAll"     
    }

    this.changeEvent = this.changeEvent.bind(this)
    this.showCompleted = this.showCompleted.bind(this)
    this.showAll = this.showAll.bind(this)
    this.showPending = this.showPending.bind(this)
    this.addNewToDo = this.addNewToDo.bind(this)
    this.deleteItem = this.deleteItem.bind(this)

  }

  fetchData = async () => {
    await fetch('http://localhost:8080/todo/getAll')
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        })     
      }
      )
    this.setCurrentState(this.state.data)   
  }

  componentDidMount() {
    this.fetchData()    
  } 

  changeEvent(id) {
    this.setState(prevState => {
      const newEliment = this.state.data.map(
        item => {
          if (item.id === id) {
            this.saveToDo({id:item.id,todo:item.todo,completed:!item.completed})            
            return item.completed = !item.completed
          }
          this.setCurrentState(this.state.data)
          if (this.state.selected === "showCompleted")
            this.showCompleted()
          else if (this.state.selected === "showPending")
            this.showPending()
          else
            this.showAll()
        }
      )
      return newEliment
    })
  }

  setCurrentState(passedData) {
    setTimeout(
      () => {
        this.setState({ arranged: passedData.map(item => <DoItem id={item.id} completed={item.completed} key={item.id} description={item.todo} delete={this.deleteItem} change={this.changeEvent} />) })
      }, 100
    )

  }

  deleteItem(id) {
    const newData = this.state.data.filter(
      item => {
        if (item.id !== id) {
          return item;
        }
      }
    )
    this.setState({ data: newData })
    this.setCurrentState(newData)
  }

  saveToDo = async (object) => {
    await fetch('http://localhost:8080/todo/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    })
    this.fetchData()
  }

  addNewToDo() {
    const newTask = {"todo": "test task", "completed": false }
    newTask.todo = document.getElementById("newTask").value || null
    if (newTask.todo != null) {
      this.saveToDo(newTask)
      this.fetchData()
      console.log(this.state.log)
      this.setCurrentState(this.state.data)      
      document.getElementById("newTask").value = null
    } else {
      alert("Please Enter A Task")
    }
  }

  showCompleted() {
    const temp = this.state.data.filter((element) => {
      return element.completed
    })
    this.setCurrentState(temp)
    this.setState({ selected: "showCompleted" })
  }

  showPending() {
    const temp = this.state.data.filter(
      (element) => {
        return !element.completed
      }
    )
    this.setCurrentState(temp)
    this.setState({ selected: "showPending" })
  }

  showAll() {
    this.setCurrentState(this.state.data)
    this.setState({ selected: "showAll" })
  }

  render() {
    return (
      <div className="divStyle">

        <h3 className="topic"> Dash-Board </h3>
        <NewToDo click={this.addNewToDo} />
        <div style={{ textAlign: "center" }}>
          <span className="radioStyle">
            <input id="showAll" type="radio" name="filter" onClick={this.showAll} />
            <lable>Show All</lable>
          </span>
          <span className="radioStyle">
            <input type="radio" name="filter" onClick={this.showCompleted} />
            <lable>Show Completed</lable>
          </span>
          <span className="radioStyle">
            <input type="radio" name="filter" onClick={this.showPending} />
            <lable>Show Pending</lable>
          </span>
        </div>
        <div>
          {this.state.arranged}
          {this.state.completedItems}
        </div>
      </div>

    )
  }
}

render(<App />, document.getElementById('root'));
