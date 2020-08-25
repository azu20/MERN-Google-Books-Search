import React from "react";

 
export function DetailImage({children} ) {
    return (       
            <img src={children} className="book-img" style={{ width: "18rem" }} alt="🤓" />  
    );
  }

export function DetailBody( props ) {
    return (       
      <div {...props}  className="card-body">       
      </div>  
    );
  }
  