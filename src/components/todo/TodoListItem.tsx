import { useState } from "react";
import { Todo } from "./TodoTemplate";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({todos}:  TodoListProps) => {
  const [ value, setValue ] = useState('');
  const [ isCompleted, setIsCompleted ] = useState('false');
  

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.isEditing === true ? (
            <>
              <label>
                <input type="checkbox" />
                <input type="text" placeholder={todo.todo} onChange={(e) => setValue(e.target.value)} value={value} />
              </label>
              <button data-testid="modify-button">제출</button> 
              <button data-testid="delete-button">취소</button>
            </>
          ) : (
            <>
              <label>
                  <input type="checkbox" />
                  <span>{todo.todo}</span>
              </label>
              <button data-testid="modify-button">수정</button> 
              <button data-testid="delete-button">삭제</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;