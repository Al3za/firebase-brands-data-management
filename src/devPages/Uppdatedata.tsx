import React, { useState } from 'react';

const UppdateData = ( path:any ) => {
   // console.log(src.path, src.nr)
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
  
         handleSubmit(event:any) {
             alert(`${path.path.name} has this pos nr: ` + this.state.value);
             event.preventDefault();
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