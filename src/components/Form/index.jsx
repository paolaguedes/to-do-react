import React, { useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export function Form() {

  const [ taskTitle, setTextTitle] = useState("")
  const [ tasks, setTasks] = useState([])


  function handleAddTask() {
    if(!taskTitle) return

    setTasks( prevState => [
      ...prevState, 
      { id: Math.random(), name: taskTitle, isCompleted: false}
    ])
  }

  function handleCompletedTask(id) {
    const taskCompleted = tasks.map( task => (
      task.id == id ? {...task, isCompleted: !task.isCompleted}
      : task
    ))

    setTasks(taskCompleted)
  }

  function handleRemoveTask(id) {
    const taskRemoved = tasks.filter( task => task.id !== id )

    setTasks(taskRemoved)
  }

  return (
    <section>
      <h1 className="title">To do :)</h1>
      <div>
        <input 
        className="input"
        type="text" 
        value={taskTitle}
        onChange={(e) => setTextTitle(e.target.value)}
        />
        <button className="submit" type="submit" onClick={handleAddTask}>
          add
        </button>
      </div>

      <div>
        <ul className="lista">
          {
            tasks.map( task => (
            <li className="lista__item" key={task.id}>
              <label className="check__container">
              <input 
                className="check"
                type="checkbox"
                readOnly
                checked={task.isCompleted}
                onClick={() => handleCompletedTask(task.id)}
              />
              <span className="btn__check"></span>
              </label>
              <p className={task.isCompleted 
              ? 'completed' : ''}
              >
                  {task.name}
              </p>
              <button
                className="delete"
                type="button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}