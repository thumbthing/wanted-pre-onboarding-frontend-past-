import { useEffect, useState } from "react"
import TodoInsert from "./TodoInsert"
import TodoList from "./TodoListItem"
import { request } from "../../request/Api";

export interface Todo {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
  isEditing: boolean,
}

const TodoTemplate = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData =async () => {
      try {
        const response = await request.getTodos('/todos');
        if(response.status === 200) setTodos(response.data as Todo[]);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  })

  return (
    <>
      <TodoInsert />
      <TodoList 
      todos={todos}
      />
    </>
  )
}

export default TodoTemplate;