import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    collection,
    CollectionReference,
    DocumentData,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore'
//import AddNewInfo, { UpdateInfo }  from './AddNew2';
import { useEffect, useState } from 'react';

  const app = initializeApp(config.firebaseConfig)
  const firestore = getFirestore();

    const createCollection = <T = DocumentData>(collectionName: string) => {
      return collection(firestore, collectionName) as CollectionReference<T>;
   };
 
interface CasinoItems {
     name: string,
     timeStamp: Date,
     info: string,
     link: string
     bonus: number,
     PosNr?:number
  };


export default function PosNrData() {

  const CasinoPath =`DevPosNum`
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)

  const [GetInfo, setGetInfo] = useState<CasinoItems[]>([])
  const [GetId, setGetId] = useState<string[]>([])


   useEffect(() => {
  
     const q = query(CasinoDataCollection,orderBy('PosNr'),orderBy('timeStamp','desc'))
     
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      
      const docId: any = []
      const collData : CasinoItems[]=[]
       querySnapshot.forEach((doc) => {
         if (!docId.includes(doc.id)) {
           docId.push(doc.id)
          }
         collData.push(doc.data())
         console.log(doc.data())
       }) 
       setGetId(docId)
       setGetInfo(collData)
     })
     return unsubscribe
   }, [])
  
   return (<div> 
    {GetInfo?.map((doc) => {
  return <div key={Math.random()}> 
    <h2>Casinos info</h2>
    <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li> <li>PosNr {doc.PosNr}</li>
      </div> 
    })} 
</div> 
)
  }

 

 
/// https://beta.reactjs.org/learn/updating-arrays-in-state
// knowledge about arrays (delete,replace ecc..)