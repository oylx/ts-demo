/** 子元素是数字类型的数组 */

let arrayOfNumber: number[] = [1, 2, 3];

/** 子元素是字符串类型的数组 */

let arrayOfString: string[] = ['x', 'y', 'z'];

/** 子元素是数字类型的数组 */

let arrayOfNumber1: Array<number> = [1, 2, 3];

/** 子元素是字符串类型的数组 */

let arrayOfString1: Array<string> = ['x', 'y', 'z'];


let anything: any = {};

anything.doAnything(); // 不会提示错误

anything = 1; // 不会提示错误

anything = 'x'; // 不会提示错误

let num: number = anything; // 不会提示错误

let str: string = anything; // 不会提示错误



let result: unknown;

if (typeof result === 'number') {

  result.toFixed(); // 此处 hover result 提示类型是 number，不会提示错误

}


const userInfo: {

  id?: number;

} = {};

let undeclared: undefined = undefined;

let unusable: void = undefined;

unusable = undeclared; // ok

// undeclared = unusable; // ts(2322)


