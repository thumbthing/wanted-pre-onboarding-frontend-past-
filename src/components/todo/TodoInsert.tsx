import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { request } from "../../request/Api";
import { Todo } from "./TodoTemplate";
import styled from "styled-components";

interface InsertTodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoInsert = ({todos, setTodos}: InsertTodoProps) => {
  const [ value, setValue ] = useState('');

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const insertTodo = {
      todo: value,
    };

    try {
      const response: AxiosResponse = await request.createTodo('/todos', insertTodo);
      if(response.status === 201) {
        setValue('')
        const insertedTodo = response.data as Todo;
        const newTodos = [...todos, insertedTodo];
        setTodos(newTodos);       
      };
    } catch (e) {
      console.log(e);
    }
  }, [todos, setTodos, value]);

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput
      data-testid='new-todo-input'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
      <StyledButton
      data-testid='new-todo-add-button'
      type="submit"
      >추가</StyledButton>
    </StyledForm>
  )
}

export default TodoInsert;

const StyledForm = styled.form` display: flex; justify-content: center; align-items: center; margin-top: 2rem;`;

const StyledInput = styled.input` padding: 0.5rem; border: none; border-radius: 0.5rem; margin-right: 1rem;`;

const StyledButton = styled.button`
padding: 0.5rem;
border: none;
border-radius: 0.5rem;
background-color: #4CAF50;
color: white;
cursor: pointer;

&:hover {
background-color: #3e8e41;
}
`;