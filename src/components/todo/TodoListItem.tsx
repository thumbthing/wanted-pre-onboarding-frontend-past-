import { useState } from "react";
import { Todo } from "./TodoTemplate";
import styled from "styled-components";

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
    <StyledTodoList>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.isEditing === true ? (
            <>
              <StyledLabel>
                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => { check(todo.id) }}/>
                <input type="text" placeholder={todo.todo} onChange={(e) => setValue(e.target.value)} value={value} />
              </StyledLabel>
              <button data-testid="modify-button" onClick={() => update(todo.id, value, todo.isCompleted)}>제출</button> 
              <button data-testid="delete-button" onClick={() => cancel(todo.id)}>취소</button>
            </>
          ) : (
            <>
              <StyledLabel>
                <input type="checkbox" checked={todo.isCompleted} onChange={(e) => check(todo.id)}/>
                <span>{todo.todo}</span>
              </StyledLabel>
              <button data-testid="modify-button" onClick={() => edit(todo.id)}>수정</button> 
              <button data-testid="delete-button" onClick={() => remove(todo.id)}>삭제</button>
            </>
          )}
        </li>
      ))}
    </StyledTodoList>
  );
}

export default TodoList;

const StyledTodoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;

  li {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    background-color: #f2f2f2;
    border-radius: 10px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e0e0e0;
    }

    input[type="checkbox"] {
      margin-right: 10px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #ccc;
      cursor: pointer;
      transition: all 0.2s ease;

      &:checked {
        border-color: #6495ed;
        background-color: #6495ed;
      }

      &:checked + span {
        text-decoration: line-through;
        color: #aaa;
      }
    }

    input[type="text"] {
      flex: 1;
      margin-right: 10px;
      border: none;
      border-bottom: 1px solid #ccc;
      background-color: transparent;
      font-size: 16px;
      color: #333;

      &:focus {
        outline: none;
        border-bottom-color: #6495ed;
      }
    }

    button {
      margin-left: 10px;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }

    button[data-testid="modify-button"] {
      background-color: #6495ed;
    }

    button[data-testid="delete-button"] {
      background-color: #ff6347;
    }
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 10px;
    font-size: 16px;
    color: #333;
  }
`;