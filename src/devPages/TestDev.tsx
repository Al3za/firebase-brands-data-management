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
import { getAuth } from 'firebase/auth';
import Uppdatedata from './Uppdatedata';

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
  posNr:number
  };


export default function TestDev(path: any) {

const auth = getAuth()  
const userID = auth.currentUser?.uid
  const CasinoPath =`DevData/${userID}/children`
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)

  const [GetInfo, setGetInfo] = useState<CasinoItems[]>([])
  const [GetId, setGetId] = useState<string[]>([])
  const [text, setText] = useState<string>("");

  //let posNum=1
   useEffect(() => {
  
     const q = query(CasinoDataCollection,orderBy('timeStamp','desc'))
     
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      
      const docId: any = []
      const collData : CasinoItems[]=[]
       querySnapshot.forEach((doc) => {
         if (!docId.includes(doc.id)) {
           docId.push(doc.id)
          }
         collData.push(doc.data())
        // posNum++
       }) 
       setGetId(docId)
       setGetInfo(collData)
     })
     return unsubscribe
   }, [])
  
    return (<div> 
        {GetInfo?.map((doc, index) => {
      return <div key={Math.random()}> 
        <h2>Casinos info</h2>
        <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li> <li>Docid {GetId[index]} </li>
        
        <Uppdatedata path={GetInfo[index]}/>  
      </div>
        })} 
  </div>
  )
  }

  // props={'altro'}
  
  //<Uppdatedata path={GetInfo}/>
//nr={`${posNum}`}

 
/// https://beta.reactjs.org/learn/updating-arrays-in-state
// knowledge about arrays (delete,replace ecc..)