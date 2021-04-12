const baseUrl = 'https://api.publicapis.org/'

export interface Api {
  API : string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}


export function getApis(): Promise<Api[]> {
  return fetch(baseUrl + 'entries')
  .then(res => res.json())
}