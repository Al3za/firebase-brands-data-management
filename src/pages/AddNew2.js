import { doc,setDoc, updateDoc} from '@firebase/firestore'
import React, { useRef } from "react";
import { db } from '../App';


const AddNewInfo = (path) => {
   // const db = getFirestore();
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
    const docDir = path.path

    async function handleSubmit(e) {
        e.preventDefault();
        const docRef = doc(db, docDir, name.current.value);
        await setDoc(docRef, {
            name: name.current.value,
            link: link.current.value,
            bonus: bonus.current.value,
            info: info.current.value
        })
        e.target.reset()
    }

        // async function handleUpdateInfo(e) {
        //     e.preventDefault();
        //     const docReference = doc(db, docDir)
        //     updateDoc(docReference, {
        //         name: name.current.value,
        //     link: link.current.value,
        //     bonus: bonus.current.value,
        //     info: info.current.value
        //     } )

        //     e.target.reset()
        // }

    return (
        <div> 
             <h1> Add casino info </h1>
                <form onSubmit={handleSubmit} >
                    <p>name <input ref={name} /></p>
                    <p>link  <input ref={link} /></p>
                    <p>bonus <input ref={bonus} /></p>
                    <p>info  <input ref={info} /></p>
                <button type="submit" >Add</button>
            </form> 
               {/* <h1> Uppdate casino info </h1>
             <form onSubmit={handleUpdateInfo} >
                    <p>name <input ref={name} /></p>
                    <p>link  <input ref={link} /></p>
                    <p>bonus <input ref={bonus} /></p>
                    <p>info  <input ref={info} /></p>
                <button type="submit" >Uppdate</button>
            </form>     */}
        </div>
    )
}

export default AddNewInfo