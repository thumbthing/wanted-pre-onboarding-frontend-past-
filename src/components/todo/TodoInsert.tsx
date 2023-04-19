import { AxiosResponse } from "axios";
import { useCallback, useState } from "react"
import { request } from "../../request/Api";

const TodoInsert = () => {
  const [ value, setValue ] = useState('');

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = {
      todo: value,
    };

    try {
      const response: AxiosResponse = await request.createTodo('/todos', todo);
      if(response.status === 201) setValue('');
    } catch (e) {
      console.log(e);
    }
  }, [value, setValue]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      return onSubmit;
    }
  }


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
      onKeyDown={ (e) => handleKeyDown }
      >추가</button>
    </form>
  )
}

export default TodoInsert;