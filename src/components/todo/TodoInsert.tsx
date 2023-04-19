import { AxiosResponse } from "axios";
import { useCallback, useState } from "react"
import { request } from "../../request/Api";
import { Todo } from "./TodoTemplate";

interface Todos {
  todos: Todo[],
}

const TodoInsert = () => {
  const [ value, setValue ] = useState('');
  const [ todos, setTodos ] = useState<Todo[]>([]);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = {
      todo: value,
    };

    try {
      const response: AxiosResponse = await request.createTodo('/todos', todo);
      if(response.status === 201) {
        setValue('')
        const insertedTodo = response.data as Todo;
        const newTodos = [...todos, insertedTodo];
        console.log(newTodos);
        
        setTodos(newTodos);
      };
    } catch (e) {
      console.log(e);
    }
  }, [value, setValue, todos]);

  // const handleKeyDown = (e: KeyboardEvent) => {
  //   if(e.key === 'Enter') {
  //     onSubmit;
  //   }
  // }


  return (
    <form onSubmit={ onSubmit }>
      <input
      data-testid='new-todo-input'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
      <button
      data-testid='new-todo-add-button'
      type="submit"
      // onKeyDown={ () => handleKeyDown }
      >추가</button>
    </form>
  )
}

export default TodoInsert;