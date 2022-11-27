import {useEffect, useState} from "react";

import {db} from '../firebase'
import {collection, query, onSnapshot} from "firebase/firestore";

import {TodoItem} from "./TodoItem";
import {AddTodo} from "./AddTodo";

export const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosList = []
      querySnapshot.forEach((doc) => {
        todosList.push({...doc.data(), id: doc.id})
      })
      setTodos(todosList.sort((a,b) => a - b))
    })
    setIsLoading(true)
    return () => unsub()
  }, [])

  return (
    <>
      <AddTodo todos={todos} setTodos={setTodos}/>
      {
        isLoading ?
          <div>
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                todo={item}/>
            ))}
          </div>
          :
          <h1>Loading</h1>
      }
    </>
  )
}