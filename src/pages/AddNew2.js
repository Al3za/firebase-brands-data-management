import {doc,setDoc} from '@firebase/firestore'
import React, { useRef } from "react";
import { db } from '../App';

const AddNewInfo = (path) => {
  //  console.log(path, 'ciao')
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
    const docDir = path.path
    console.log(docDir, 'hej')

    async function handleSubmit(e) {
        e.preventDefault();
        const docRef = doc(db, docDir, name.current.value);
        await setDoc(docRef, {
            name: name.current.value,
            link: link.current.value,
            bonus: bonus.current.value,
            info: info.current.value
        })
        console.log(docDir, name.current.value)
        e.target.reset()
    }
    return (
        <div> 
            <h1> welcome</h1>
                <form onSubmit={handleSubmit} >
                    name <input ref={name} />
                    link  <input ref={link} />
                    bonus <input ref={bonus} />
                    info  <input ref={info} />
                    <button type="submit" >Add</button>
                </form>
        </div>
    )
}

export default AddNewInfo