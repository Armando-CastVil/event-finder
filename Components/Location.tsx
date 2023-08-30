import React from "react";

export default class Location extends React.Component <{}, { value: string }>
  {
    coordinates: string;
   
    constructor(props:any) {
      
      super(props);
      this.state = 
      {
        value:""
      };
      this.coordinates=""
    }

    
  
    componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({value: position.coords.latitude.toString()+","+position.coords.longitude.toString()});
        this.coordinates=position.coords.latitude.toString()+","+position.coords.longitude.toString();
        
      });
    }
  
    render() {
      
      return (
        <React.Fragment>
          {this.state.value}
          
        </React.Fragment>
          
      );
    }
  }
  
  