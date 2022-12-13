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
import ChildrenList from './ChildrenList';
import AddNew from './AddNew';

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
  const CasinoDataCollection = createCollection<CasinoItems>('CasinoInfo')
    

const BrandsData = () => {
   
   const auth = getAuth()  
   const user = auth.currentUser?.email
   
   const CasinoDataCollection = createCollection<CasinoItems>(`CasinoInfo`)
   const [values, loading, error] = useCollectionData(CasinoDataCollection) 
    
  return (
       
    <div>
      hay {user}
          {loading && 'loading...'}
           <div> 
             <ChildrenList path={`CasinoInfo/${user}/children`} />
           </div>
           
         <p><button onClick={() => signOut(auth)}> sign out of Firebase </button></p>
        </div>
    ) 
 }

export default BrandsData
 
 