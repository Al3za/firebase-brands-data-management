import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app'
import { config } from '../config/Config'
//import SignOutButton from './pages/SignOut'
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

  const app = initializeApp(config.firebaseConfig)
  const firestore = getFirestore();
  const db=getFirestore(app)


   const createCollection = <T = DocumentData>(collectionName: string) => {
     return collection(firestore, collectionName) as CollectionReference<T>;
  }; // den är vår collection reference
 
  interface TodoItem {
     id?: string,
     text: string,
     timeStamp: Date
  };
 
 const todosCollection = createCollection<TodoItem>('todos')
    

 const BrandsData = () => {

 const [todoText, setTodoText] = useState<string>('');
 const [todos, setTodos] = useState<TodoItem[]>([])
    
      const auth = getAuth()  
      useEffect(() => {
          const q = query(todosCollection)
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const latest: TodoItem[] = []
              querySnapshot.forEach((doc) => {
                  latest.push(doc.data())
              })
              setTodos(latest)
          })
          return unsubscribe
      }, [])
     
      const removeTodo = async (item: TodoItem) => {
        const docRef = doc(firestore, 'todos', item.id || '')
        deleteDoc(docRef)
        // not working yet
      }
     
      const addTodo = async (text: string) => {
        setTodoText('');
        addDoc(todosCollection, {
          // addDoc adderar en document :text and timestamp i vår collektion
          text: text,
          timeStamp: new Date()
        })
      };

     return (
         <div>
             <div>
                {todos.map((item) => {
          return <div>
            <li key={item.id}>{item.text}</li> <span onClick={() => removeTodo(item)} >delete</span>
          </div>
        })}
      </div>
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
         <button onClick={(e) => addTodo(todoText)}> send </button>
         <button onClick={() => signOut(auth)}> sign out of Firebase </button>
        </div>
    ) 
 }

 export default BrandsData