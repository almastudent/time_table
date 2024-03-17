

import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track editing status
  const editId = useRef(null); // Ref to store the ID of the todo being edited
// console.log(isEditing,editId.current)
  const addTodo = () => {
    
    if (input.trim()) {
      const newTodo = { id: Date.now(), text: input };
      setTodos([...todos, newTodo]);
      setInput('');
    } else {
      alert('Please Enter Valid Todo....');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo=(updatedtext)=>{
    if(updatedtext.trim()){
      setTodos(

        todos.map((todo)=>todo.id=== editId.current? {...todo,text:updatedtext} : todo )
      );
      setIsEditing(false);
      editId.current=null;
      setInput("")
    }else{
      alert("update with some text..")
    }
  }
 

  return (
    <>
      <div className="container">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          name="username"
          placeholder="some text here.."
        />
        <button onClick={addTodo}>Submit</button>
      </div>
      <div className="todolist">
        <ul>
          {todos.map((item) => (
            <li key={item.id}>
              {
                isEditing && editId.current=== item.id ?
                 (
                  <input type='text' defaultValue={item.text} onBlur={(e)=>updateTodo(e.target.value)}/>
                ):(
                 <>
                  {item.text}
                  <i className="fas fa-edit" onClick={() => {
                    setIsEditing(true);
                    editId.current=item.id;
                    }}>

                  </i>
                 </>
                  
                )

              }
             
              <i className="fas fa-trash-alt" onClick={() => deleteTodo(item.id)}></i>
              
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}


export default App;

