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
 import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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
 
 

export default function ChildrenList(path: any) {
  const CasinoPath = path.path
  console.log(CasinoPath,'hej')
  
  const CasinoDataCollection = createCollection<CasinoItems>( `${CasinoPath}` )
  const [values, loading, error] = useCollectionData(CasinoDataCollection)

  
  return <ul> {values?.map((doc) => {
    return <li key={Math.random()}> {doc.name} </li> 
  })} <AddNew path={CasinoPath} />
  </ul>
}


