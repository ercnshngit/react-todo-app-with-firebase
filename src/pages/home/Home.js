import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
      'todos',
      ["uid", "==", user.uid],
      ["deadline", "asc"]
    )

  return (
    <div className="grid grid-cols-[2fr_1fr] max-w-4xl mx-auto my-16">
        <div className=" pr-8">
        { error && <p className="error-badge">{error}</p> }
        { documents && <TodoList todos={documents} />}
        </div>
        <div className=" pl-8">
          <TodoForm uid={user.uid} />
        </div>
    </div>
  )
}