import {  doc,  serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../App';


const UppdateScroll = (path: any) => {
    //console.log(path,'teste')
   const InputsTest=  class NameForm extends React.Component<{}, {name: string,link:string,bonus:number,info:string, show:boolean }> {
         constructor(props:any) {
             super(props);
             this.state = { name: '', bonus:0, link: '', info:'', show:false };
  
             this.handleNameChange = this.handleNameChange.bind(this);
             this.handleBonusChange = this.handleBonusChange.bind(this);
             this.handleInfoChange = this.handleInfoChange.bind(this);
             this.handleLinkChange = this.handleLinkChange.bind(this);
             this.handleSubmit = this.handleSubmit.bind(this);
             this.handleClick = this.handleClick.bind(this)
         }
  
         handleNameChange(event:any) {
             this.setState({
                 name: event.target.value,
             });
       }
       
       handleBonusChange(event: any) {
           this.setState({
            bonus: event.target.value
           })
       }

       handleInfoChange(event: any) {
        this.setState({
         info: event.target.value
        })
       }
       
       handleLinkChange(event: any) {
        this.setState({
         link: event.target.value
        })
    }
  
       async handleSubmit(event: any) {
           event.preventDefault();
           console.log(
               this.state.name,
               this.state.link,
               this.state.bonus,
               this.state.info
           )
          //const DocIDs= dicID
          // const docDir = `DevPosNum/${DocIDs}`;
          // console.log(docDir,'direction',DocIDs,'ID')
          //  const docRef:any = doc(db, docDir);
         //  const PathData = path;
           
        //    await setDoc(docRef,{
        //         name: PathData.name,
        //         link: PathData.link,
        //         bonus: PathData.bonus,
        //         info: PathData.info,
        //         timeStamp: serverTimestamp(),
        //         PosNr: this.state.name
        //    })
           //event.preventDefault();
       }
       
       handleClick = () => {
           let nr = 0
           nr += 1
           if (nr % 2 === 1) {
               this.setState({
                   show: true
               })
           } else if(nr %2===0) {
            this.setState({
                show: false
            })
           }
       }
  
         render() {
             return (
                 <div> <button onClick={(e) => this.handleClick()} > uppdate/hide </button><br />
                     {this.state.show ?
                         <form onSubmit={this.handleSubmit}>
                             <label>
                                 Name <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                                 bonus <input type="text" value={this.state.bonus} onChange={this.handleBonusChange} />
                                 info <input type="text" value={this.state.info} onChange={this.handleInfoChange} />
                                 link <input type="text" value={this.state.link} onChange={this.handleLinkChange} />
                             </label>
                             <input type="submit" value="Submit" />
                         </form>
                         :''}
                 </div>
             );
         }
     }
    return <InputsTest/>
}
  


export default UppdateScroll

