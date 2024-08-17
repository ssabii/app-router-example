import { getTodos } from "@/apis/todos";

async function Todos() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return <div>There was no todos</div>;
  }

  return <ul>
    {todos.map((todo) => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>;
}

export default Todos;