import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    collection,
    CollectionReference,
    DocumentData,
    getFirestore,
    onSnapshot,
    query,
} from 'firebase/firestore'
import AddNewInfo, { UpdateInfo }  from './AddNew2';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

  const app = initializeApp(config.firebaseConfig)
  const firestore = getFirestore();
  //const db=getFirestore()


    const createCollection = <T = DocumentData>(collectionName: string) => {
      return collection(firestore, collectionName) as CollectionReference<T>;
   }; // den är vår collection reference
 
  interface CasinoItems {
     id?: string,
     name: string,
     timeStamp: Date,
     info: string,
     link: string
     bonus:number
  };
 

export default function ChildrenList2(path: any) {

  const CasinoPath = path.path
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)
 // const [values, loading] = useCollectionData(CasinoDataCollection)
  const [GetInfo, setGetInfo] = useState<CasinoItems[]>([])
  const [GetId, setGetId] = useState<string[]>([])




  useEffect(() => {
  
    const q = query(CasinoDataCollection)
    const docId:any =[]
    const latest: CasinoItems[] = []
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        latest.push(doc.data())
        docId.push(doc.id)
      }) 
      setGetInfo(latest)
      setGetId(docId)
    })
   // return unsubscribe
  }, [])
  

    return  <div> {GetInfo?.map((doc) => {
      return <div key={Math.random()}> 
        <h2>Casinos info</h2>
        <li> id {doc.id} name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li> <br /> 
        {GetId?.map((Ids) => {
              return  <UpdateInfo path={`${CasinoPath}/${Ids}`} /> 
        })}
      </div>
    })} <AddNewInfo path={`${CasinoPath}`} />
  </div>

  }
           
   
           //  <UpdateInfo path={`${CasinoPath}/${doc.id}`} />


 
