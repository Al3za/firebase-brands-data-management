import { getAuth, signOut } from 'firebase/auth';
import ChildrenList2 from './ChildrenList';


const BrandsData =  () => {

   const auth = getAuth()  
   const userID = auth.currentUser?.uid
  
  return (
       
    <div>
           <div> 
            <ChildrenList2 path={`CasinoInfo/${userID}/children`} /> 
        </div>
             <p><button onClick={() => signOut(auth)}> sign out of Firebase </button></p>
        </div>
    ) 
 }

export default BrandsData
 
 //https://softauthor.com/firebase-firestore-update-document-data-updatedoc/