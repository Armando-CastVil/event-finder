import React from "react";

  export default class Radius extends React.Component <{}, { value: number }>
  {
    radius: number;
    constructor(props:any)
    {
      super(props);
      
      this.state = {
        value:0
      };

      this.radius;
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
      
    
    handleFormSubmit:any=(event:any) =>{
      event.preventDefault();
      this.radius=this.state.value;
      console.log(this.radius)
      
    }
    handleChange:any=(event:any) =>
    {
      this.setState({value: event.target.value});
    }


    render() {
      return (
        <div id="radiusForm">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Radius:
            <textarea placeholder="Enter Radius" value={this.state.value} onChange={this.handleChange} />
            
          </label>
          
          <input type="submit" value="Submit" />
        </form>
        
        </div>
      );
    }
  }