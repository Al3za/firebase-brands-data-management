import {addDoc, doc, collection, updateDoc, serverTimestamp, deleteDoc, setDoc } from '@firebase/firestore'
import { async } from '@firebase/util';
import React, { useRef, useState } from "react";
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

     const Deletedata = async () => {
         const docRef = doc(db, docDir2);
         await deleteDoc(docRef)
     }

     return (
         <div>
             <form onSubmit={ChangeData} >
                 <h2> update casino info </h2>
                          <p>name <input ref={name} /></p>
                          <p>link  <input ref={link} /></p>
                          <p>bonus <input ref={bonus} /></p>
                          <p>info  <input ref={info} /></p>
                    <button type="submit" >Uppdate</button>
             </form>
             <button onClick={(e)=>Deletedata()} > Delete </button>
         </div>
     )
}

const AddNewInfo = (path) => {

    let nr=0
    const [btn,setBtn]=useState()
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
            timeStamp: serverTimestamp(),
          }); 
        e.target.reset()
    }

    const handleButton = () => {
        nr += 1
        if (nr % 2 === 0) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }

    return (
        <div> {btn ? <div>
            <h1> Add casino info </h1>
            <form onSubmit={handleSubmit} >
                <p>name <input ref={name} /></p>
                <p>link  <input ref={link} /></p>
                <p>bonus <input ref={bonus} /></p>
                <p>info  <input ref={info} /></p>
                <button type="submit" >Add</button>
            </form>
        </div> : ''}
            <button onClick={(e)=>handleButton()} > Add casino </button>
        </div>
    )
}

export const DevDatas =  (path)  => {
    const docDir = path.path
    const dataInfo = path.infos
    const docRef = doc(db, docDir);
      setDoc(docRef,{
        name: dataInfo.name,
        link: dataInfo.link,
        bonus: dataInfo.bonus,
        info: dataInfo.info,
       timeStamp: dataInfo.timeStamp,
      })
      return <p> </p>
}

export default AddNewInfo


    