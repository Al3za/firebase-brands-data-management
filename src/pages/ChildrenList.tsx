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
import AddNewInfo, { DevDatas, UpdateInfo }  from './AddNew2';
import { useEffect, useState } from 'react';
import UppdateScroll from './UppdateScroll';

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
  };


export default function ChildrenList2(path: any) {

  const CasinoPath = path.path
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)

  const [GetInfo, setGetInfo] = useState<CasinoItems[]>([])
  const [GetId, setGetId] = useState<string[]>([])
  const [search,setSearch] = useState<any>('')

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
       }) 
       setGetId(docId)
       setGetInfo(collData)
     })
     return unsubscribe
   }, [search])
  
  const searchQuery = () => {
    setGetInfo(GetInfo.filter((casInfos) => {
     return casInfos.name.toLowerCase().includes(search.toLowerCase())
    }))
  }
  
  return (<div> search casino name <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
    <button onClick={(e) => searchQuery()} > search </button>
    <h2>Casinos info</h2>
    {GetInfo?.map((doc, index) => {
      return <div key={Math.random()}><br/>
      <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li>  
        <UppdateScroll path={`${CasinoPath}/${GetId[index]}`} />
        <DevDatas path={`DevData/${GetId[index]}`} infos={GetInfo[index]} />
      </div>
    })} <AddNewInfo path={`${CasinoPath}`} />
  </div>)

  }
           
  


 
