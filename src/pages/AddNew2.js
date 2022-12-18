
import {addDoc, doc, collection, updateDoc, serverTimestamp } from '@firebase/firestore'

import React, { useRef } from "react";
import { db } from '../App';


 export const UpdateInfo =  (path)=> {
    
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
     const docDir2 = path.path
     
     async function ChangeData(e) {
         e.preventDefault();
          const docRef = doc(db, docDir2);
          await updateDoc(docRef, {
              name: name.current.value,
               link: link.current.value,
              bonus: bonus.current.value,
              info: info.current.value,
           })
     }

     return (
         <form onSubmit={ChangeData} >
             <h2> update casino info </h2>
                      <p>name <input ref={name} /></p>
                      <p>link  <input ref={link} /></p>
                      <p>bonus <input ref={bonus} /></p> 
                      <p>info  <input ref={info} /></p>     
                <button type="submit" >Uppdate</button>
            </form> 
     )
}

const AddNewInfo = (path) => {
   // const db = getFirestore();
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
    const docDir = path.path

    const coll = collection(db, docDir)
    

    async function handleSubmit(e) {
        e.preventDefault();
        await addDoc(coll,{ name: name.current.value,
             link: link.current.value,
             bonus: bonus.current.value,
             info: info.current.value,
             timeStamp: serverTimestamp()
          }); 
        e.target.reset()
    }

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

        </div>
    )
}

export default AddNewInfo


    