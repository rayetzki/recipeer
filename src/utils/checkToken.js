export const checkToken = token => {
  console.log(token);
  return Number(token.expiresIn) - new Date().getTime() > 0;
};
