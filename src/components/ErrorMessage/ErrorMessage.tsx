import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorMessage = (statusCode: any) => {
  if (parseInt(statusCode.statusCode) < 500) {
    return (
      <div>
        <h1>This is a 400 error</h1>
      </div>
    ) 
  } else {
    return (
      <div>
        <h1>This is a 500 error</h1> 
      </div>
    ) 
  }
  
};

