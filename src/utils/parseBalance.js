export const parseBalance = balance => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH"
  }).format(balance);
};
