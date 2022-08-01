import { useFirestore } from "../../hooks/useFirestore"

export default function TodoList({ todos }) {
    const { deleteDocument } = useFirestore('todos')
  return (
    <ul>
        {(todos.length <1) && <p>There is nothing here!</p>}
        {todos.map((todo) => {            
            return (
                <li key={todo.id}
                className="mx-auto my-4 border-2 border-l-green-500 rounded shadow p-4 items-center relative flex overflow-clip"
                >
                    <span className="text-lg">{todo.todo}</span>
                    <span className="text-lg ml-auto mr-3 font-bold">{todo.deadline.toDate().toDateString()}</span>
                    <button className="button-base" onClick={() => deleteDocument(todo.id)}>X</button>
                </li>
            )
        })}
    </ul>
  )
}