import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    getFirestore,
    onSnapshot,
    query
} from 'firebase/firestore'
 import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChildrenList from './ChildrenList';
import AddNew from './AddNew';

   const app = initializeApp(config.firebaseConfig)
   const firestore = getFirestore();
   const db=getFirestore(app)
     const createCollection = <T = DocumentData>(collectionName: string) => {
       return collection(firestore, collectionName) as CollectionReference<T>;
    }; // den är vår collection reference
 
   interface CasinoItems {
      id?: string,
      name: string,
      timeStamp: Date,
      info: string,
      link: string
      bonus:string
   };
  const CasinoDataCollection = createCollection<CasinoItems>('CasinoInfo')
    

 const BrandsData = () => {

   const [Name, setName] = useState<string>('');
   const [Info, setInfo] = useState<string>('')
   const [Bonus, setBonus] = useState<string>('')
   const [Link, setLink] = useState<string>('');
   //const [ShowInfo, setShowInfo] = useState<CasinoItems[]>([])
   const [values, loading, error] = useCollectionData(CasinoDataCollection)
  
    
        const auth = getAuth()  
      // useEffect(() => {
      //   const q = query(CasinoDataCollection)
   
      //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //         const latest: CasinoItems[] = []
      //         querySnapshot.forEach((doc) => {
      //             latest.push(doc.data())
      //         })
      //       setShowInfo(latest)
      //       console.log(ShowInfo)
      //       // fix this array
      //     })
      //     return unsubscribe
      // }, [])
     
      //  const removeTodo = async (item: CasinoItems) => {
      //    const docRef = doc(firestore, 'Info', item.id || '')
      //    deleteDoc(docRef)
         // not working yet
      // }
     
        // const addCasinoInfo = async () => {
        //  // setName('');
        //   addDoc(CasinoDataCollection, {
        //     // addDoc adderar en document :text and timestamp i vår collektion
        //     name: Name,
        //     timeStamp: new Date(),
        //     info: Info,
        //     bonus: Bonus,
        //     link:Link
        //   })
        // };
   
   
     return (
         <div>
            
         <input type="text" value={Name} onChange={(e) => setName(e.target.value)}  /> Casino name <br/>
         <input type="text" value={Info} onChange={(e) => setInfo(e.target.value)} /> About casino <br />
         <input type="text" value={Bonus} onChange={(e) => setBonus(e.target.value)} /> Bonus <br />
         <input type="text" value={Link} onChange={(e) => setLink(e.target.value)} /> Link <br/>

         {/* <button onClick={(e) => addCasinoInfo()}> send </button>  */}
         <p><button onClick={() => signOut(auth)}> sign out of Firebase </button></p>

         <p>welcome, please insert the name of the brand</p>
          {loading && 'loading...'}
         <ul>
           {values?.map((doc) => {
             return <div key={Math.random()}> <li>{doc.name}</li>
               <ChildrenList path={`CasinoInfo/${doc.name}/children`} />
             </div>
           })}
           brand name
           <AddNew path={'CasinoInfo'} />
         </ul> 
         
        </div>
    ) 
 }

export default BrandsData
 
 