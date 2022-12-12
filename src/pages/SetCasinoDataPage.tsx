import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    getFirestore,
    onSnapshot,
    query
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

   
   const [values, loading, error] = useCollectionData(CasinoDataCollection)
    
        const auth = getAuth()  
    
   
   
     return (
         <div>
            
         <p><button onClick={() => signOut(auth)}> sign out of Firebase </button></p>

         <p>welcome, please insert the name of the brand</p>
          {loading && 'loading...'}
         <ul>
           {values?.length !== 0 ? (
             <div>
               {values?.map((doc) => {
             return <div key={Math.random()}> <li>{doc.name}</li>
               <ChildrenList path={`CasinoInfo/${doc.name}/children`}/>
             </div>
           })}
             </div>
           ) : (
            <AddNew path={'CasinoInfo'} />
           ) }
           
         </ul> 
         
        </div>
    ) 
 }

export default BrandsData
 
 