import './InputTodoBox.css'

const InputTodoBox = ({
                          addNewTodo,
                          length
}) => {
        return(
            <div className="InputTodoBox">
                <input type="text"
                       onKeyDown={(event)=>{
                                    if(event.key === 'Enter'){
                                        addNewTodo(
                                                {
                                                    id:length,   // id problem
                                                    text:event.target.value,
                                                    isCompleted: false
                                                }
                                        )
                                        event.target.value = ''
                                    }
                       }
                }
                />
            </div>
        )
}
export default InputTodoBox