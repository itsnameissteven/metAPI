import React from 'react';
import {Api} from '../../apiCalls'

type ApiProp = {
  apiList: 

    {
      API : string;
      Description: string;
      Auth: string;
      HTTPS: boolean;
      Cors: string;
      Link: string;
      Category: string;
  }[]
  
}
export const CardContainer = ({apiList}: ApiProp) => {

  const ApiCards = apiList.map(apiObj => {
    return <article>
    <p>
      {apiObj.API}
    </p>
    </article>
  })

  return <div>{ApiCards}</div>

}