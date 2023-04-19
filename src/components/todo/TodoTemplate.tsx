import { useCallback, useEffect, useState } from "react"
import TodoInsert from "./TodoInsert"
import TodoList from "./TodoListItem"
import { request } from "../../request/Api";
import { useNavigate } from "react-router-dom";

export interface Todo {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
  isEditing: boolean,
}

const TodoTemplate = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const navigate = useNavigate();

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

  const handleEdit = useCallback((id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: true };
      } else {
        return todo;
      }
    })
    setTodos(newTodos);
  },[]);

  const handleUpdate = useCallback(async (id: number, value: string, isCompleted: boolean) => {
    try {
      const updateForm = {
        todo: value,
        isCompleted: isCompleted,
      };
      const response = await request.updateTodo(`/todos/${id}`, updateForm);
      if (response.status === 200) {
        const updateTodo = response.data as Todo;
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            return {...todo, todo: updateTodo.todo};
          }
          return todo; 
        })
        setTodos(newTodos);
      }
    } catch (e) {
      console.log(e);
    } finally {
    
    }
  }, [])

  const handleCancel = useCallback( (id: number) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, isEditing: false};
      }
      return todo;
    });
    
    setTodos(newTodos);
  }, [])

  const handleCheck = useCallback( (id: number) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      } else {
      return todo;
      }
    })
    setTodos(newTodos);
  },[todos, setTodos])

  const handleDelete = useCallback(async (id: number) => {
    try {
      const response = await request.deleteTodo(`/todos/${id}`);
      if (response.status === 204) {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
      }
    } catch (e) {
      console.log(e);
    }
  },[]);
  
  return (
    <>
      <TodoInsert />
      <TodoList 
      todos={todos}
      edit={handleEdit}
      remove={handleDelete}
      cancel={handleCancel}
      check={handleCheck}
      update={handleUpdate}
      />
    </>
  )
}

export default TodoTemplate;