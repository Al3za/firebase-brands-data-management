import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    collection,
    CollectionReference,
    DocumentData,
    getFirestore,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AddNew from './AddNew';
import ChildrenList2 from './ChildrenList2';
import { useNavigate } from 'react-router-dom';

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



export default function ChildrenList(path: any) {

  const navigate = useNavigate()
  
  const CasinoPath = path.path
  //console.log(CasinoPath,'hej')
  
  const CasinoDataCollection = createCollection<CasinoItems>( `${CasinoPath}` )
  const [values, loading, error] = useCollectionData(CasinoDataCollection)

  return <ul> {values?.map((doc) => {
    return<div>
      <li key={Math.random()}> {doc.name} </li> 
      <ChildrenList2 path={`${CasinoPath}/${doc.name}/children`}/>
      <button onClick={(e) => navigate('/test')}> modify </button>  
    </div>
  })} add casinos  <AddNew path={CasinoPath} />
  </ul>
}


///<ChildrenList2 path={`${CasinoPath}/${doc.name}/children`}/>