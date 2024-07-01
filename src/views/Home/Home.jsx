import "./Home.css"
import "./../../components/ToDoCard/ToDoCard"
import ToDoCard from './../../components/ToDoCard/ToDoCard'
import { useState } from 'react';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Swal from "sweetalert2";

function Home() {
    const [todoList, setTodoList] = useState([])
    const [newTask, setNewTask] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        const savedTodoList = localStorage.getItem("todoList")
        if (savedTodoList)
            setTodoList(JSON.parse(savedTodoList))

    }, [])

    useEffect(() => {
        if (todoList === 0)
            return

        localStorage.setItem("todoList", JSON.stringify(todoList))
    })

    function deleteItem(index) {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this task!",
            icon: "warning",
            showCancelButton: true
        }).then((result) => {
            if (!result.isConfirmed) {
                return
            }
            const newList = todoList.filter((item, i) => {
                if (i != index) {
                    return true
                }
                else {
                    return false
                }
            })
            setTodoList(newList)
        })


    }

    return (
        <div>
            <h1 className='app-title'>ToDo App🗒️</h1>

            <div className='todo-list-container'>
                {todoList.map((todoItem, i) => {

                    const { task, category } = todoItem

                    return <ToDoCard key={i} index={i} task={task} category={category} deleteItem={deleteItem} />
                }
                )}
                {
                    todoList.length === 0 ?
                        <p style={{ textAlign: "center" }}>
                            No task to show, please add new task
                        </p> : null
                }
            </div>

            <div className='add-todo-item-container'>
                <input type='text'
                    placeholder='Add new task'
                    className='add-input'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <select className='category-select '
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    <option value="learning">Learning</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="travel">Travelling</option>
                    <option value="others">Others</option>
                </select>

                <img src='https://cdn-icons-png.flaticon.com/128/14453/14453382.png'
                    alt='add' className='add-icon'
                    onClick={() => {
                        if (newTask === "") {
                            toast.error("OOPS!! Task cannot be added...")
                            return
                        }
                        if (category === "") {
                            toast.error("Please select a category...")
                        }

                        setTodoList([...todoList, { task: newTask, category: category }])
                        setNewTask("")
                        setCategory("")
                        toast.success("Task added successfully...")
                    }} />
            </div>



            <Toaster position='top-right' />
        </div>
    )
}

export default Home