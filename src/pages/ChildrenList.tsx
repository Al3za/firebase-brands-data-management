/* eslint-disable react/style-prop-object */
import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    collection,
    CollectionReference,
    DocumentData,
    getFirestore,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AddNewInfo from './AddNew2';

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
     bonus:number
  };
 

export default function ChildrenList2(path: any) {

  const CasinoPath = path.path
  
  const CasinoDataCollection = createCollection<CasinoItems>( `${CasinoPath}` )
  const [values, loading, error] = useCollectionData(CasinoDataCollection)

  
   return  <div> {values?.map((doc) => {
     return <div  key={Math.random()}>
       <li> name {doc.name}</li>  <li>bonus {doc.bonus}</li>  <li>info {doc.info} </li><li> link {doc.link} </li> <br />  
     </div>
   })}
     <AddNewInfo path={`${CasinoPath}`}  /> 
          
   </div>
}



