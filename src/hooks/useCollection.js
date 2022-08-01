import { useEffect, useRef, useState } from "react"
import { serviceFirestore } from "../firebase/config"


export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let db = serviceFirestore.collection(collection)

        if (query) {
            db = db.where(...query)
        }
        if (orderBy) {
            db = db.orderBy(...orderBy)
        }

        const unsub = db.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            setDocuments(results)
            setError(null)
        }, (error) => {
            setError('can not sync')
            console.log(error.message)
        })

        return () => unsub()

    }, [collection, query, orderBy])
    

    return { documents, error }
}