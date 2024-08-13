import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";

import {v4 as uuidv4} from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  // Array which holds all tasks 
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
     let todoString = localStorage.getItem("todos")
     if (todoString) {
     let todos = JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
     }
  }, [])
  
  const toggleFinished = (e) => {
       setshowFinished(! showFinished)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }

  const handleEdit = (e , id) => {
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handleDelete = (e , id) => {
      let newTodos = todos.filter(item=>{
        return item.id !== id;
      })
      setTodos(newTodos);
      saveToLocalStorage();
  }

  const handleAdd = () => {
      setTodos([...todos, {id: uuidv4() , todo , isCompleted: false}])
      setTodo("")
      console.log(todos)
      saveToLocalStorage();
  }

  const handleChange = (e) => {
      setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
     let id = e.target.name;
     let index = todos.findIndex(item=> {
        return item.id === id;
     })
     let newTodos = [...todos];
     newTodos[index].isCompleted = ! newTodos[index].isCompleted;
     setTodos(newTodos)
     saveToLocalStorage();
  }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>Task Manager- Manage your tasks here</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add Your Tasks here : </h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg py-1' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-green-800 hover:bg-green-950 disabled:bg-green-800 p-2 font-semibold py-1 text-white rounded-md'>Save</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished}  type="checkbox" checked={showFinished} /> <label className='mx-2 font-bold' htmlFor="show">Show Completed Tasks</label>
        <div className='h-[1px] bg-black opacity-15 mx-auto'></div>
          <h2 className='text-xl font-bold my-5'>Your Tasks :-</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-6 text-xl'>No Tasks to display...!!!!</div>}
            {todos.map(item => {
           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full  my-3">
              <div className='flex gap-5'>
            <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-green-800 hover:bg-green-950 p-2 font-semibold py-1 text-white rounded-md mx-4'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}}className='bg-green-800 hover:bg-green-950 p-2 font-semibold py-1 text-white rounded-md mx-2'><AiFillDelete /></button>
              </div>
            </div>
              })}
          </div>
      </div>
    </>
  )
}

export default App
