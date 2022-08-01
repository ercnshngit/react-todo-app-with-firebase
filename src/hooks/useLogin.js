import { useEffect, useState } from "react"
import { serviceAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [ isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await serviceAuth.signInWithEmailAndPassword(email,password)
            if(!res) {
                throw new Error("Bir hata oluştu.")
            }

            // dispatch login
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } 
        catch (err) {
            if (!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        } 
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, login }
}