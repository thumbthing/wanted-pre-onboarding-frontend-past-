import { Todo } from "./TodoTemplate";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = () => {
  return (
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span>todo</span>
        </label>
        <button>수정</button>
        <button>삭제</button>
      </li>
    </ul>
  );
}

export default TodoList;