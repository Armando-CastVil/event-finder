import React, { useState } from "react";

  export default function CoordinatesForm ()
  {
    const [coordinates,setCoordinates] = useState("placeholder");
   
      
    
    const handleSubmit= (event: { preventDefault: () => void; })  => {
        event.preventDefault();
        
        
        
    }


    
      return (
        <div>
             <form onSubmit={e => { handleSubmit(e) }}>
                    <label>
                     Coordinates:
                    <input type="text"  onChange={e => setCoordinates(e.target.value)}/> 
                    </label>
                    <input type="submit" value="Submit"  />
            </form>
        
        </div>
       
       
      )
}
  