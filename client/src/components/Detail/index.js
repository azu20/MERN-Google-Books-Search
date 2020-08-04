import React from "react";

 
export function DetailImage({children} ) {
    return (       
            <img src={children} className="card-img" alt="🤓" />  
    );
  }

export function DetailBody( props ) {
    return (       
      <div {...props}  className="card-body">       
      </div>  
    );
  }
  