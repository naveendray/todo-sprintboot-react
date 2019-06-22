import React from 'react'

function DoItem(props) {

  const completedStyle = {
    color: "grey",
    textDecoration: "line-through",
    fontStyle: "italic"
  }

  return (
    <div className="elementStyle">
    <lable style={props.completed ? completedStyle : null}> {props.description}
      <input className="inputCheckbox"  id={props.id} checked={props.completed} type="checkbox" onChange={(event => {
        props.change(props.id)
      })} />
      </lable>
      <button onClick={() => {props.delete(props.id)}} className="deleteButton">X</button>
    </div>
  )
}

export default DoItem