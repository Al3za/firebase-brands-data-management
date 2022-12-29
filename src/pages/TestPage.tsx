import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
  addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentData,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from 'firebase/firestore'
//import AddNewInfo, { UpdateInfo }  from './AddNew2';
import { useEffect, useState } from 'react';
//import { getAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { db } from '../App';

  const app = initializeApp(config.firebaseConfig)

  const firestore = getFirestore();


    const createCollection = <T = DocumentData>(collectionName: string) => {
      return collection(firestore, collectionName) as CollectionReference<T>;
   }; // den är vår collection reference
 
interface CasinoItems {
     name: string,
     timeStamp?: Date,
     info: string,
     link: string
    bonus: number,
    posNr?:number
  };


export default function ChildrenList3() {

  //const CasinoPath = `CasinoInfo`
   const auth = getAuth()  
  const userID = auth.currentUser?.uid
  
 
  
    const CasinoDataCollection = createCollection<CasinoItems>('CasinoInfo')
  
  const [GetInfo, setGetInfo] = useState<any[]>([])
  const [GetId, setGetId] = useState<string[]>([])
  const collData: any[] = []
  
  useEffect(() => {
     const q = query(CasinoDataCollection)
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       querySnapshot.forEach((doc) => {
         collData.push( `CasinoInfo/${doc.id}/children`)
       }) 
       GetPath(collData)
     })
     return unsubscribe
  }, [])
  
   const GetPath=(item: any[]) => {
     const CasinosPaths = item
     const docId: any = []
     const collData: CasinoItems[] = []
     CasinosPaths.forEach((itemPath) => {
       const CasinoDataCollection = createCollection<CasinoItems>(itemPath)
       const q=query(CasinoDataCollection,orderBy('timeStamp','desc'))
       const unsubscribe = onSnapshot(q, (querySnapshot) => {
         querySnapshot.forEach((doc) => {
           if (!docId.includes(doc.id)) {
             docId.push(doc.id)
            }
           collData.push(doc.data())
         })
         setGetId(docId)
         setGetInfo(collData)
       })
       return unsubscribe
     })
   }
  
  useEffect(() => {
   
    GetInfo.map((docs, index) => {
      //const docDir3 = `DevData/${userID}/${GetId[index]}`
      const docDir3 = `DevData/${userID}/children/${GetId[index]}`
      const docRef = doc(db, docDir3);
     // const coll:any = collection(db, docDir3)
    return setDoc(docRef,
         {
           name: docs.name,
           link: docs.link,
           info: docs.info,
           bonus: docs.bonus,
           timeStamp: docs.timeStamp,
         })
     })
     
 },[])
  
  return (
    <div>
      <div>
        {GetInfo?.map((doc, index) => {
        
        return <div key={Math.random()}>
          <h2>all user data</h2>
          <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link}</li> <li> DOC ID {GetId[index]} </li>
        </div>
      })}
      </div>
      
    </div>
  )
}
           
  

//  <UpdateInfo path={`${CasinoPath}/${GetId[index]}`} />
// <AddNewInfo path={`${CasinoPath}`} />
//orderBy('timeStamp','desc')
//{/* <SingleCasinoList path={`CasinoInfo/${collData[index]}/children/${GetId[index]}`}/> */}
