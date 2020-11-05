export const checkToken = token => {
  return Number(token.expirationTime) - new Date().getTime() > 0;
};
