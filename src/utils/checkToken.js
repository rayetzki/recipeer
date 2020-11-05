export const checkToken = token => {
  return Number(token.expiresIn) - new Date().getTime() > 0;
};
