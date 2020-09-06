import React , { useState , useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import Todolist from './Components/todolist';

function App() {

  const [inputText , setInputText ] = useState("");
  const [todos ,setTodos] = useState([]);
  const [ status , setStatus ] = useState('all');
  const [filterTodos ,setFilterTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);

  

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilterTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilterTodos(todos.filter(todo => todo.completed === false));
        break;
      default : 
        setFilterTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null ){
      localStorage.setItem('todos',JSON.stringify([]));
    } else {
      let todoLocal  = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Your to-do List</h1>
      </header>
      <Form  
      inputText = {inputText} 
      todos = {todos} 
      setTodos = {setTodos} 
      setInputText={setInputText}
      setStatus = {setStatus}
      
      />
      <Todolist 
      todos = {todos} 
      setTodos = {setTodos} 
      filterTodos = {filterTodos} />
    </div>
  );
}

export default App;
