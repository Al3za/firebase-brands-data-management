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
import AddNewInfo, { UpdateInfo }  from './AddNew2';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

  const app = initializeApp(config.firebaseConfig)
  const firestore = getFirestore();

    const createCollection = <T = DocumentData>(collectionName: string) => {
      return collection(firestore, collectionName) as CollectionReference<T>;
   }; // den är vår collection reference
 
interface CasinoItems {
     name: string,
     timeStamp: Date,
     info: string,
     link: string
    bonus: number,
  };


export default function ChildrenList2(path: any) {

  const CasinoPath = path.path
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)
  //const [values, loading] = useCollectionData(CasinoDataCollection)
  const [GetInfo, setGetInfo] = useState<CasinoItems[]>([])
  const [GetId, setGetId] = useState<string[]>([])

   useEffect(() => {
  
     const q = query(CasinoDataCollection, orderBy('timeStamp','desc'))// asc put the oldest down
     const docId: any = []
     const collData : CasinoItems[]=[]
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       querySnapshot.forEach((doc) => {
         console.log(doc.data(), doc.id, 'data u got')
         if (!docId.includes(doc.id)) {
           docId.push(doc.id)
          }
         collData.push(doc.data())
       }) 
       setGetId(docId)
       setGetInfo(collData)
     })
     return unsubscribe
   }, [])
  
  console.log(GetId,'id')

    return ( <div> {GetInfo?.map((doc,index) => {
      return <div key={Math.random()}> 
        <h2>Casinos info</h2>
         <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li> <br /> 
          <UpdateInfo path={`${CasinoPath}/${GetId[index]}`} />  
      </div>
    })} <AddNewInfo path={`${CasinoPath}`} />
  </div>)

  }
           
  


 
