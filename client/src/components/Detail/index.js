import React from "react";

export function Detail({ children }) {
    return (
        <div className="card mb-3" >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="..." className="card-img" alt="🤓" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <h6 className="card-subtitle"></h6>
              <p className="card-text">{children}</p>
            </div>
          </div>
        </div>
      </div>
     
      
    //   <div className="list-overflow-container">
    //     <ul className="list-group">{children}</ul>
    //   </div>
    );
  }
  
//   export function ListItem({ children }) {
//     return <li className="list-group-item">{children}</li>;
//   }
  