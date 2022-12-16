import {addDoc, doc,setDoc, collection, getFirestore, updateDoc , getDocs} from '@firebase/firestore'
import React, { useRef } from "react";
import { db } from '../App';
//import { getDatabase, ref, set } from "firebase/database";


 export const UpdateInfo =  (path)=> {
    // await updateDoc(updateRef, { name: 'gallo' })
    // const name = useRef()
    // const info = useRef()
    // const link = useRef()
    // const bonus = useRef()
    const docDir2 = path.path
   //  console.log(docDir2, 'idis')
    //  const update = {
    //      bonus: 200,
    //      link: 'http',
    //      info: 'http...sandro',
    //      name:'Danton' 
    //  }
     
     async function ChangeData(e) {
         e.preventDefault();
         console.log(docDir2)
        e.target.reset()
     }

     return (
         <form onSubmit={ChangeData} >
             <h2> update casino info </h2>
                    {/* <p>name <input ref={name} /></p>
                    <p>link  <input ref={link} /></p>
                    <p>bonus <input ref={bonus} /></p>
                    <p>info  <input ref={info} /></p>  */}
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

    