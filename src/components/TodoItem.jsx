import {useState} from "react";

import {db} from '../firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'

import {AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineFile} from 'react-icons/ai'
import {BsFillCalendarXFill, BsFillCalendarDateFill} from 'react-icons/bs'
import dayjs from "dayjs";

export const TodoItem = ({todo}) => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const [edit, setEdit] = useState(null)
  const [isOverdue] = useState(dayjs(new Date()).unix())

  const completeTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }

  const removeTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo))
  }

  const editTodo = (item) => {
    setTitleValue(item.titleValue)
    setDescriptionValue(item.descriptionValue)
    setDateValue(item.dateValue)

    setEdit(item.id)
  }

  const saveUpdatedTodo = async (e, todo) => {
    e.preventDefault()

    await updateDoc(doc(db, "todos", todo),{
      titleValue: titleValue,
      descriptionValue: descriptionValue,
      dateValue: dayjs(dateValue).format('DD.MM.YYYY'),
      fileValue: fileValue
    })
    setEdit(null)
  }

  return (
    <>
      <div key={todo.id} >
        {edit === todo.id ?
          <form onSubmit={(e) => saveUpdatedTodo(e, todo.id)}  className="form">
            <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text"/>
            <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text"/>
            <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date"/>
            <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file" className="inputFile"/>
            <input type="submit" value="Сохранить"/>
          </form>
          :
          <div className={todo.completed ? "todoCompleted todo" : "todo "}>
            <h3>{todo.titleValue}</h3>
            <p>Описание: <br/> {todo.descriptionValue}</p>

            <div className="servicesInfo">
              {
                todo.dateValue !== 'Invalid Date' ?
                  <span> {isOverdue > dayjs(new Date(todo.dateValue)).unix() ? <BsFillCalendarXFill className="danger"/> : <BsFillCalendarDateFill className="calendar"/>}  {todo.dateValue}</span> : ''
              }

              {
                todo.fileValue !== '' ?
                  <span> <AiOutlineFile className="file"/> {todo.fileValue}</span> : ''
              }
            </div>

            <button className={todo.completed ? 'btn green' : 'btn simpleBtn'} onClick={() => completeTodo(todo)}><AiOutlineCheck/></button>
            <button className=" btn red" onClick={() => removeTodo(todo.id)}><AiOutlineDelete/></button>
            <button className=" btn orange" onClick={() => editTodo(todo)}><AiOutlineEdit/></button>
          </div>}
      </div>
    </>
  )
}