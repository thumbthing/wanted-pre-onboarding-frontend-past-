import { useState } from "react";
import { Todo } from "./TodoTemplate";

interface TodoListProps {
  todos: Todo[];
  edit: (id: number) => void;
  remove: (id: number) => Promise<void>;
  update: (id: number, todo: string, isCompleted: boolean) => Promise<void>;
}

const TodoList = ({todos, edit, remove, update}:  TodoListProps) => {
  const [ value, setValue ] = useState('');
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);
  

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.isEditing === true ? (
            <>
              <label>
                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => setIsCompleted(!todo.isCompleted)}/>
                <input type="text" placeholder={todo.todo} onChange={(e) => setValue(e.target.value)} value={value} />
              </label>
              <button data-testid="modify-button" onClick={() => update(todo.id, value, todo.isCompleted)}>제출</button> 
              <button data-testid="delete-button" onClick={() => setIsEditing(!todo.isEditing)}>취소</button>
            </>
          ) : (
            <>
              <label>
              <input type="checkbox" checked={todo.isCompleted} onChange={(e) => setIsCompleted(!todo.isCompleted)}/>
                <span>{todo.todo}</span>
              </label>
              <button data-testid="modify-button" onClick={() => edit(todo.id)}>수정</button> 
              <button data-testid="delete-button" onClick={() => remove(todo.id)}>삭제</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;