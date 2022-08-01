import { useEffect, useReducer, useState } from "react"
import { serviceFirestore, timestamp } from "../firebase/config"


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'PENDING':
            return { ...state, isPending: true, document: null, success: false, error: null }
        case 'ADDED':
            return { ...state, isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED':
            return { ...state, isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return {...state, isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export function useFirestore(collection) {
    const [ response, dispatch ] = useReducer(firestoreReducer, initialState)
    const [ isCancelled, setIsCancelled] = useState(false)

    //collection
    const db = serviceFirestore.collection(collection)

    //dispatch without unmount errors
    const dispatchNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    //add
    const addDocument = async (doc) => {
        dispatch({ type: 'PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const updatedAt = createdAt
            const deadlineAt = timestamp.fromDate(new Date(doc.deadline))
            const original = doc.todo
            const done = false

            const addedDocument = await db.add({...doc, done, createdAt, updatedAt, deadline: deadlineAt, original})
            dispatchNotCancelled({ type: 'ADDED', payload: addedDocument})
        } 
        catch (err) {
            dispatchNotCancelled({ type: 'ERROR', payload: err.message})
        }

    }
    
    //del
    const deleteDocument = async (id) => {
        dispatch({ type: 'PENDING' })
        try {
            await db.doc(id).delete()
            dispatchNotCancelled({ type: 'DELETED'})
        } 
        catch (err) {
            dispatchNotCancelled({ type: 'ERROR', payload: err.message})
        }
    }


    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, response}
}