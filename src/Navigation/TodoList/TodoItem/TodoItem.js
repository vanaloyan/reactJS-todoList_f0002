import './TodoItem.css'
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from "react";

const TodoItem = ({
  item,
  deleteTodo,
  checkTodo,
  restoreTodo,
  isEditable,
  setTodo,
  index,
  todos
}) => {

    useEffect(()=>{
        return ()=> console.log('unmount')
    },[])

    const {id,isCompleted,text} = item

    const location = useLocation()
    const [isInTrash,setIsInTrash] = useState(false)
    const [inputValue,setInputValue] = useState('')
    const [isEdit,setIsEdit] = useState(false)

    useEffect(()=>{
        if(location.pathname.includes('trash-list')){
            setIsInTrash(true)
        }else{
            setIsInTrash(false)
        }

    },[location.pathname])

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(text)
        setIsEdit(prev=>!prev)

    }

    return(

        <div className="TodoItem">
                <input type="checkbox"
                           checked={isCompleted}
                           onChange={(e) => {
                               checkTodo(
                                       { id:id,
                                           text:text,
                                           isCompleted : e.target.checked
                                       })
                           }}
                />
            <p>{text}</p>
            {
                isInTrash && <button className="restoreBtn" onClick={()=>{restoreTodo({id,text,isCompleted})}}>r</button>
            }

            {
                isEditable
                &&
                    <form onSubmit = {handleSubmit}>
                            <button type='submit' >e</button>

                            <input className="openEditInput"

                                className={isEdit ? "openEditInput" : "closeEditInput"}
                                value={inputValue}
                                onChange={({target})=>setInputValue(target.value)}
                                onKeyDown={(e)=>{
                                    if(e.key === "Enter"){
                                        if(setTodo){
                                            const newItems = todos.map((elem,ind)=>{
                                                if(index === ind && inputValue.trim(' ')){

                                                        return {...elem, text: inputValue}

                                                }
                                                return elem
                                            })
                                            setTodo(newItems)
                                        }
                                    }
                                }}
                                type="text"
                            />
                    </form>
            }
            <button className="deleteBtn"  onClick={()=>{deleteTodo({id,text,isCompleted},location.pathname)}}>x</button>
        </div>
    )
}
export default TodoItem