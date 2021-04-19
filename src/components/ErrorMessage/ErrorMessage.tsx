import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai"

export const ErrorMessage = (statusCode: any) => {
  if (parseInt(statusCode.statusCode) < 500) {
    return (
      <div className="error-message-container">
        <div className="error-message">
          <AiOutlineExclamationCircle className="warning-icon"/>
          <h2>Sorry, we couldn't find the page you're looking for.</h2>
          <button className="error-button" onClick={() => window.location.href="/"}>Go back</button>
        </div>
      </div>
    ) 
  } else {
    return (
      <div className="error-message-container">
        <div className="error-message">
          <AiOutlineExclamationCircle className="warning-icon" />
          <h2>Sorry, there was a problem. Please try again later</h2>
          <button className="error-button" onClick={() => window.location.href="/"}>Try again</button>
        </div>    
      </div>
    ) 
  }
  
};

