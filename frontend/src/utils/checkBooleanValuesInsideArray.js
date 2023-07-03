export const checkFalsyValuesInsideArray = (arr) => {
  const arrOfFalsy = arr.filter(el => el === false)
  return arrOfFalsy.length > 0
}