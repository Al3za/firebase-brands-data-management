import {  addDoc, collection, doc,  serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../App';
//const firestore = getFirestore();


   

const UppdateData = (src: { path: any, dicID: any }) => {
    
    
//    const DocIDs= src.dicID
//    const docDir = `DevPosNum/${DocIDs}`;
//     const docRef:any = doc(db, docDir);
//     const PathData = src.path;
   
   const Inputs=  class NameForm extends React.Component<{}, {value: string}> {
         constructor(props:any,path:any) {
             super(props);
             this.state = { value: '' };
  
             this.handleChange = this.handleChange.bind(this);
             this.handleSubmit = this.handleSubmit.bind(this);
         }
  
         handleChange(event:any) {
             this.setState({ value: event.target.value });
         }
  
       async handleSubmit(event: any) {
        event.preventDefault();
          const DocIDs= src.dicID
           const docDir = `DevPosNum/${DocIDs}`;
           console.log(docDir,'direction',DocIDs,'ID')
            const docRef:any = doc(db, docDir);
           const PathData = src.path;
           
           await setDoc(docRef,{
                name: PathData.name,
                link: PathData.link,
                bonus: PathData.bonus,
                info: PathData.info,
                timeStamp: serverTimestamp(),
                PosNr: this.state.value
           })
           //event.preventDefault();
         }
  
         render() {
             return (
                 <form onSubmit={this.handleSubmit}>
                     <label>
                         Pos Nr: 
                         <input type="text" value={this.state.value} onChange={this.handleChange} />
                     </label>
                     <input type="submit" value="Submit" />
                 </form>
             );
         }
     }
    return <Inputs/>
}
  


export default UppdateData

//(src: { path:any,nr:any } )