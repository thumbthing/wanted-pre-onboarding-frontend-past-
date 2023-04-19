import TodoInsert from "./TodoInsert"
import TodoList from "./TodoListItem"

export interface Todo {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
  isEditing: boolean,
}

const TodoTemplate = () => {
  return (
    <>
      <TodoInsert />
      <TodoList />
    </>
  )
}

export default TodoTemplate;