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
import SingleCasinoList from './SingleCasinoList';

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


export default function ChildrenList2() {

  //const CasinoPath = `CasinoInfo`
  // const auth = getAuth()  
  //  const userID = auth.currentUser?.uid
  
    const CasinoDataCollection = createCollection<CasinoItems>('CasinoInfo')
  
  const [GetInfo, setGetInfo] = useState<any[]>([])
  const [GetId, setGetId] = useState<string[]>([])
  const collData:any[]=[]
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
  console.log(GetInfo,'ciao')
  
    return ( <div> {GetInfo?.map((doc,index) => {
      return <div key={Math.random()}>
        <h2>all user data</h2>
        <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} {GetId[index]} </li>
        {/* <SingleCasinoList path={`CasinoInfo/${collData[index]}/children/${GetId[index]}`}/> */}
        <SingleCasinoList path={GetInfo[1]} />
        <button>chose position number</button>
      </div>
    })}
  </div>)
}
           
  

//  <UpdateInfo path={`${CasinoPath}/${GetId[index]}`} /> 
// <AddNewInfo path={`${CasinoPath}`} />
//orderBy('timeStamp','desc')