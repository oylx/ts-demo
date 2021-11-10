{

  let str: string = 'this is string';

  let num: number = 1;

  let bool: boolean = true;

}

{

  const str: string = 'this is string';

  const num: number = 1;

  const bool: boolean = true;

}

{

  /** 根据参数的类型，推断出返回值的类型也是 number */

  function add1(a: number, b: number) {

    return a + b;

  }

  const x1 = add1(1, 1); // 推断出 x1 的类型也是 number


  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */

  function add2(a: number, b = 1) {

    return a + b;

  }

  const x2 = add2(1);

  const x3 = add2(1, 1); // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number | undefined

}

{

  type Adder = (a: number, b: number) => number;

  const add: Adder = (a, b) => {

    return a + b;

  }

  const x1 = add(1, 1); // 推断出 x1 类型是 number

  const x2 = add(1, 2);  // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number

}

{

  type Goods = 'pen' | 'pencil' | 'ruler';

  const getPenCost = (item: 'pen') => 2;

  const getPencilCost = (item: 'pencil') => 4;

  const getRulerCost = (item: 'ruler') => 6;

  const getCost = (item: Goods) => {

    if (item === 'pen') {

      return getPenCost(item); // item => 'pen'

    } else if (item === 'pencil') {

      return getPencilCost(item); // item => 'pencil'

    } else {

      return getRulerCost(item); // item => 'ruler'

    }

  }

}
{

  let specifiedStr: 'this is string' = 'this is string';

  let specifiedNum: 1 = 1;

  let specifiedBoolean: true = true;

  let str: String = '123'

  // specifiedStr = str // TS2322: Type 'String' is not assignable to type '"this is string"'.


}


let hello: 'hello' = 'hello';
let hi: 'hi'

hi = 'hi'; // ts(2322) Type '"hi"' is not assignable to type '"hello"'

interface Config {

  size: 'small' | 'big';

  isEnable:  true | false;

  margin: 0 | 2 | 4;

}

{

  const str = 'this is string'; // str: 'this is string'

  const num = 1; // num: 1

  const bool = true; // bool: true

}

{

  let str = 'this is string'; // 类型是 string

  let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;

  const specifiedStr = 'this is string'; // 类型是 'this is string'

  let str2 = specifiedStr; // 类型是 'string'

  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;


}








