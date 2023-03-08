// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasNaN = (arr: Array<any>): boolean => {
  const array1: number[] = arrToNumArr(arr);
  const array2: number[] = array1.filter((v) => !isNaN(v));
  if (array2.length === arr.length) return false;
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrToNumArr = (arr: Array<any>): number[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newArr: number[] = arr.map((v) => Number(v));
  return newArr;
};

export { hasNaN, arrToNumArr };
