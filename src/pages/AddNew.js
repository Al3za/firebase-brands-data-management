import {doc,setDoc} from '@firebase/firestore'
import React, { useRef } from "react";
import { db } from '../App';

const AddNew = (path) => {
    const name = useRef()
    const docDir = path.path

    async function handleSubmit(e) {
       e.preventDefault();
        const docRef = doc(db, docDir, name.current.value);
        await setDoc(docRef, {name:name.current.value})
        e.target.reset()
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input ref={name}/>
                <button type="submit" >Add</button>
            </form>
        </div>
    )
}

export default AddNew