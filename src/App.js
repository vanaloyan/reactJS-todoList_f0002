import './App.css';
import {initialValues} from "./constants/costants";
import Menu from "./Menu/Menu";
import {Switch,Route} from "react-router-dom";
import TodoList from "./Navigation/TodoList/TodoList";
import NotFound from "./Navigation/NotFound/NotFound";
import {useState} from "react";
import InputTodoBox from "./InputTodoBox/InputTodoBox";

const App = () => {
    const [todos,setTodos] = useState(initialValues)
    const [completed,setCompleted]  = useState([])
    const [trash,setTrash] = useState([])
    const addNewTodo = newTodoObj => {
        if(newTodoObj.text.trim(' ')){
            setTodos(prev=>[...prev,newTodoObj])
        }
    }

    const deleteTodo = (deleteItem,location) => {
        let newData = []
        switch (location){
            case '/':
                newData = [...todos]
                setTrash(prev => [...prev, deleteItem])
                newData = todos.filter(item => item.id !== deleteItem.id)
                setTodos(newData)
                break

            case '/trash-list':
                 newData = [...trash]
                 newData = trash.filter(item => item.id !== deleteItem.id)
                 setTrash(newData)
                 break

            case '/completed':
                newData = [...completed]
                setTrash(prev => [...prev, deleteItem])
                newData = completed.filter(item => item.id !== deleteItem.id)
                setCompleted(newData)
                break
        }
    }

    const restoreTodo = (restoreItem) =>{


        if(restoreItem.isCompleted){
            setCompleted(prev=>[...prev,restoreItem])
        }else {
            setTodos(prev => [...prev,restoreItem])
        }


        let newTrashData = [...trash]
        newTrashData = trash.filter(item => item.id !== restoreItem.id)
        setTrash(newTrashData)
    }

    const checkTodo =  checkItem => {
        if(checkItem.isCompleted){
            let newTodoData = [...todos]
            setCompleted(prev => [...prev,checkItem])
            newTodoData = todos.filter(item=>item.id !== checkItem.id)
            setTodos(newTodoData)
        }
        else {
            let newCompletedData = [...completed]
            setTodos(prev => [...prev,checkItem])
            newCompletedData = completed.filter(item=>item.id !== checkItem.id)
            setCompleted(newCompletedData)

        }
    }

    return (
        <div className="App">

              <Menu />

              <Switch>
                    <Route exact path="/"
                           render = {() => <TodoList
                               obj = {todos}
                               length={todos.length}
                               deleteTodo = {deleteTodo}
                               checkTodo={checkTodo}
                               isEditable // true
                               setTodo={setTodos}
                           />}
                    />

                    <Route exact path="/trash-list"
                             render={()=><TodoList
                                 obj={trash}
                                 restoreTodo={restoreTodo}
                                 deleteTodo={deleteTodo}
                             />}
                    />

                    <Route exact path="/completed"
                             render={()=><TodoList obj={completed}
                                                   deleteTodo = {deleteTodo}
                                                   checkTodo={checkTodo}

                             />}
                    />

                  <Route  path="*" component={NotFound}/>
              </Switch>

              <InputTodoBox
                    addNewTodo={addNewTodo}
                    length={todos.length}
              />
        </div>
    );
}
export default App;
