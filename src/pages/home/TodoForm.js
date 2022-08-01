import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"

export default function TodoForm({uid}) {
    const [todo, setTodo] = useState('')
    const [deadline, setDeadline] = useState('')
    const { addDocument, response } = useFirestore('todos')
    const [showElement,setShowElement] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({uid: uid, todo, deadline})

    }
 
    useEffect(() => {
        if (response.success) {
            setShowElement(true)
            setTodo('')
            setDeadline('')
            setTimeout(function() {
                setShowElement(false)
            }, 2000);
        }
    },[response.success])

  return (
    <>
        <h2 className="text-2xl font-bold pb-2 mb-4 border-b-2 border-gray-400">New Todo</h2>
        <form onSubmit={handleSubmit} className="p-5 bg-primary rounded-xl">
            <label>
                <span className="block my-2 font-bold text-white">todo:</span>
                <input 
                required
                type="text" 
                className="input-base" 
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                />
            </label>
            <label>
                <span className="block my-2 font-bold text-white">deadline:</span>
                <input 
                type="date" 
                className="input-base" 
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                />
            </label>
            {!response.isPending &&<button className="button-base text-white w-full mt-4 border-white">Add New</button>
             }
            {response.isPending && <button className="button-base text-white w-full mt-4 border-white" disabled>loading...</button>
             }
            {response.error && <p className="error-badge">{response.error}</p> 
            }
            {showElement && <p className="error-badge bg-green-400">Eklendi</p> 
            }
        </form>
    </>
  )
}