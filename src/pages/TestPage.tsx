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
 
 const CasinoDataCollection = createCollection<CasinoItems>('CasinoInfo/andrew tate/children/')
    

 const Test = () => {

   const [Name, setName] = useState<string>('');
   const [Info, setInfo] = useState<string>('')
   const [Bonus, setBonus] = useState<string>('')
   const [Link, setLink] = useState<string>('');
   const [ShowInfo, setShowInfo] = useState<CasinoItems[]>([])
   const [values, loading, error] = useCollectionData(CasinoDataCollection)
   console.log(values)
  
    
        const auth = getAuth()  
      useEffect(() => {
        const q = query(CasinoDataCollection)
   
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const latest: CasinoItems[] = []
              querySnapshot.forEach((doc) => {
                  latest.push(doc.data())
              })
            setShowInfo(latest)
            console.log(ShowInfo)
            // fix this array
          })
          return unsubscribe
      }, [])
     
       const removeTodo = async (item: CasinoItems) => {
         const docRef = doc(firestore, 'Info', item.id || '')
         deleteDoc(docRef)
         // not working yet
       }
     
        const addCasinoInfo = async () => {
         // setName('');
          addDoc(CasinoDataCollection, {
            // addDoc adderar en document :text and timestamp i vår collektion
            name: Name,
            timeStamp: new Date(),
            info: Info,
            bonus: Bonus,
            link:Link
          })
        };
   
   
     return (
         <div>
             {/* <div>
                {Info.map((item) => {
          return <div>
            <li key={item.id}>{item.text}</li> <span onClick={() => removeTodo(item)} >delete</span>
          </div>
        })}
      </div> */}
         {/* <input type="text" value={Name} onChange={(e) => setName(e.target.value)}  /> Casino name <br/>
         <input type="text" value={Info} onChange={(e) => setInfo(e.target.value)} /> About casino <br />
         <input type="text" value={Bonus} onChange={(e) => setBonus(e.target.value)} /> Bonus <br />
         <input type="text" value={Link} onChange={(e) => setLink(e.target.value)} /> Link <br/> */}

         {/* <button onClick={(e) => addCasinoInfo()}> send </button>  */}
         {/* <button onClick={() => signOut(auth)}> sign out of Firebase </button> */}
          <>
              {loading && 'loading...'}
               {values?.map((doc) => {
                 <div key={Math.random()} > <li>hi</li> </div>
               })}
          </>
          
         
        </div>
    ) 
 }

export default Test
 
 