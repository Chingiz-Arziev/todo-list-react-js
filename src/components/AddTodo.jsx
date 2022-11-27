import React, {useState} from "react";

import {db} from '../firebase'
import {collection, addDoc} from 'firebase/firestore'
import {storage} from "../firebase";
import {ref, uploadBytes} from 'firebase/storage'

import dayjs from "dayjs";

export const AddTodo = () => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const clearForm = () => {
    setTitleValue('')
    setDescriptionValue('')
    setDateValue('')
    setFileValue('')
  }

  const uploadFiles = () => {
    const fileRef = ref(storage, `files/${dayjs(new Date).unix()}`)
    uploadBytes(fileRef, fileValue)
      .then(() => {
        console.log('uploading file')
      })
  }

  const saveUpdatingTodo = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, "todos"), {
      id: dayjs(new Date()).unix(),
      titleValue,
      descriptionValue,
      dateValue: dayjs(dateValue).format('DD.MM.YYYY'),
      completed: false,
      overdue: false
    })

    uploadFiles()
    clearForm()
  }

  return (
    <form onSubmit={saveUpdatingTodo} className="form">
      <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text" placeholder="Заголовок"/>
      <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text" placeholder="Описание"/>
      <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date" />

      <input onChange={(e) => setFileValue(e.target.files)} type="file" className="inputFile" multiple/>

      <input type={"submit"} disabled={titleValue.length && descriptionValue.length ? '' : 'disabled'} value='Добавить Задачу'/>
    </form>
  )
}