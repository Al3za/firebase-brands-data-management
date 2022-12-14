import {addDoc, doc,setDoc, collection, getFirestore, updateDoc} from '@firebase/firestore'
import React, { useRef } from "react";
import { db } from '../App';
//import { getDatabase, ref, set } from "firebase/database";


 export const UpdateInfo =  (path)=> {
    // await updateDoc(updateRef, { name: 'gallo' })
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
     const docDir2 = path.path
    // const docRef = doc(db, docDir2);
     const coll2 = collection(db, docDir2)

     //await setDoc(docRef,{user:user})
    
     async function ChangeData(e) {
         e.preventDefault();
         const docRef = doc(db, docDir2);
         await setDoc(docRef,{ name: name.current.value,
            link: link.current.value,
            bonus: bonus.current.value,
            info: info.current.value}) 
        e.target.reset()
     }

     return (
         <form onSubmit={ChangeData} >
                    <p>name <input ref={name} /></p>
                    <p>link  <input ref={link} /></p>
                    <p>bonus <input ref={bonus} /></p>
                    <p>info  <input ref={info} /></p> 
                <button type="submit" >Uppdate</button>
            </form> 
     )
}

const AddNewInfo = (path) => {
    const name = useRef()
    const info = useRef()
    const link = useRef()
    const bonus = useRef()
    const docDir = path.path
    const coll = collection(db, docDir)
   // const updateRef= doc(db,docDir,'f8eJel8TGtnJSvdyzI6M')
    
    async function handleSubmit(e) {
        e.preventDefault();
          addDoc(coll,{ name: name.current.value,
            link: link.current.value,
            bonus: bonus.current.value,
            info: info.current.value}); 
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

             {/* <h1> Uppdate casino info </h1>       
               */}
              {/* <h1> Uppdate casino info </h1>
             <form onSubmit={handleUpdateInfo} >
                    <p>name <input ref={name} /></p>
                    <p>link  <input ref={link} /></p>
                    <p>bonus <input ref={bonus} /></p>
                    <p>info  <input ref={info} /></p>
                <button type="submit" >Uppdate</button>
            </form>    */}
        </div>
    )
}

export default AddNewInfo

// async function handleSubmit(e) {
//     e.preventDefault();
//     const docRef = doc(db, docDir);
//     await addDoc(docRef, {
//         name: name.current.value,
//         link: link.current.value,
//         bonus: bonus.current.value,
//         info: info.current.value
//     })
//     e.target.reset()
// } this uppdate existing data




//async function handleUpdateInfo(e) {
    //        e.preventDefault();
    //      await  set(ref(db, docDir), {
    //            name: name.current.value,
    //            link: link.current.value,
    //            bonus: bonus.current.value,
    //            info: info.current.value
    //          });
    //        e.target.reset()
    //    }

    