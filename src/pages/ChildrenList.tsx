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
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { ref, uploadBytes } from 'firebase/storage'
import {v4} from 'uuid' 
import AddNewInfo, { DevDatas }  from './AddNew2';
import { useEffect, useState } from 'react';
import UppdateScroll from './UppdateScroll';

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);
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
  id:string
  };


export default function ChildrenList2(path: any) {

  const CasinoPath = path.path
  
  const CasinoDataCollection = createCollection<CasinoItems>(`${CasinoPath}`)

  const [GetInfo, setGetInfo] = useState<CasinoItems[]|void>([])
  const [search, setSearch] = useState<any>('')
  const [imgUpload,setImgUpload]=useState<any>(null)

   useEffect(() => {
  
     const q = query(CasinoDataCollection,orderBy('timeStamp','desc'))
     
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
     
       const collData: CasinoItems[] | void = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         id:doc.id,
       }))
       setGetInfo(collData)
     })
     return unsubscribe
   }, [search])
  
   const searchQuery = () => {
     setGetInfo(GetInfo?.filter((casInfos) => {
      return casInfos.name.toLowerCase().includes(search.toLowerCase())
     }))
  }
  
  const uppload = () => {
    if (imgUpload === null) return;
    const imageRef = ref(storage, `images/${imgUpload.name + v4()}`);
    uploadBytes(imageRef, imgUpload).then(() => {
      alert('Image uploaded')
    })
  };
  
  return (
    <div> 
      search casino name <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
    <button onClick={(e) => searchQuery()} > search </button>
    <h2>Casinos info</h2>
    {GetInfo?.map((doc,index) => {
      return <div key={Math.random()}><br/>
      <li> name {doc.name}</li> <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li>  
        <UppdateScroll path={`${CasinoPath}/${doc.id}`} />
        <DevDatas path={`DevData/${doc.id}`} infos={GetInfo[index]} />
      </div>
    })}<br />
      <AddNewInfo path={`${CasinoPath}`} />
      <input type="file"
        onChange={(e) => {
          setImgUpload(e.target.files && e.target.files[0]);
        }} />
      <button onClick={(e)=>uppload()} >uppload image</button>
  </div>)

  }
           
  


 
