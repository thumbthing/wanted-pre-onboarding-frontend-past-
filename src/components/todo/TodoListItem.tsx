import { useState } from "react";
import { Todo } from "./TodoTemplate";

interface TodoListProps {
  todos: Todo[];
  edit: (id: number) => void;
  remove: (id: number) => Promise<void>;
  cancel: (id: number) => void;
  check: (id: number) => void;
  update: (id: number, todo: string, isCompleted: boolean) => Promise<void>;
}

const TodoList = ({todos, edit, remove, cancel, check, update}:  TodoListProps) => {
  const [ value, setValue ] = useState('');
  
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.isEditing === true ? (
            <>
              <label>
                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => { check(todo.id) }}/>
                <input type="text" placeholder={todo.todo} onChange={(e) => setValue(e.target.value)} value={value} />
              </label>
              <button data-testid="modify-button" onClick={() => update(todo.id, value, todo.isCompleted)}>제출</button> 
              <button data-testid="delete-button" onClick={() => cancel(todo.id)}>취소</button>
            </>
          ) : (
            <>
              <label>
              <input type="checkbox" checked={todo.isCompleted} onChange={(e) => check(todo.id)}/>
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