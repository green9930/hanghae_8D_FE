const MAX_LENGTH_PRICE = 8;
const priceVali = (target) => {
  const regExp = /^[0-9\s+]*$/g;
  return regExp.test(target);
};

const handlePrice = (val) => {
  const price = val.replaceAll(",", "").substr(0, MAX_LENGTH_PRICE);
  let isValid;
  let realPrice;
  let previewPrice;

  if (priceVali(price)) {
    isValid = price.length ? true : false;
    realPrice = price.replace(/(^0+)/, "").length
      ? price.replace(/(^0+)/, "")
      : "0";
    previewPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return { isValid, realPrice, previewPrice };
};

export default handlePrice;
