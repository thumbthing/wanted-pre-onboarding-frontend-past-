import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react"
import { request } from "../../request/Api";
import { Todo } from "./TodoTemplate";

interface Todos {
  todos: Todo[],
}


const TodoInsert = () => {
  const [ value, setValue ] = useState('');
  const [ todos, setTodos ] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getTodos('/todos');
        if (response.status === 200) setTodos(response.data as Todo[]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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