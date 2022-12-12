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
import AddNewInfo from './AddNew2';
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
 

export default function ChildrenList2(path: any) {

  //const navigate= useNavigate()
  const CasinoPath2 = path.path
  console.log(CasinoPath2,'hejsanssss')
  
  const CasinoDataCollection = createCollection<CasinoItems>( `${CasinoPath2}` )
  const [values, loading, error] = useCollectionData(CasinoDataCollection)

  
   return  <div> {values?.map((doc) => {
     return <div  key={Math.random()}>
       <li> {doc.name} {doc.bonus} {doc.info} {doc.link} </li> 
       
     </div>
   })}
         < AddNewInfo path={CasinoPath2} />   
   </div>
}



