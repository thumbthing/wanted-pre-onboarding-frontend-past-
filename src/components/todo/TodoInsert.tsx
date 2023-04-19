import { useState } from "react"

const TodoInsert = () => {
  const [ value, setValue ] = useState('');

  return (
    <form>
      <input/>
      <button>추가</button>
    </form>
  )
}

export default TodoInsert;