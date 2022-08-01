import { useEffect, useState } from "react"
import { serviceAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [ isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await serviceAuth.createUserWithEmailAndPassword(email, password)
            
            if(!res) {
                throw new Error("Bir hata oluştu.")
            }

            //adding display name
            await res.user.updateProfile({ displayName })

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

    return { error, isPending, signup }
}