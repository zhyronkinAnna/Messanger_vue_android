
export interface ITokens {
    access_token: string;
}
export function convertToITokens(data: any): ITokens {
  return {
    access_token: data.access_token,
  };
}