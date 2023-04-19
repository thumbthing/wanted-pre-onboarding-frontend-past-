import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { request } from "../../request/Api";
import { Todo } from "./TodoTemplate";

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
  }, [todos, value]);

  return (
    <form onSubmit={onSubmit}>
      <input
      data-testid='new-todo-input'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
      <button
      data-testid='new-todo-add-button'
      type="submit"
      >추가</button>
    </form>
  )
}

export default TodoInsert;