/**
 * @description 返回 min（包含）到 max（包含）的数字
 */
 export const randomInteger = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomEnum = (enumArr:any) => {
  return enumArr[randomInteger(0, enumArr.length - 1)];
};