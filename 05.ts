// function add() {}

const add = (a: number, b: number) => a + b

function fn(): void {

  // TODO

}

console.log(fn()); // => undefined

{
  type Adder = (a: number, b: number) => number; // TypeScript 函数类型定义

  const add: Adder = (a, b) => a + b; // ES6 箭头函数

}

{
  interface Entity {

    add: (a: number, b: number) => number;

    del(a: number, b: number): number;

  }

  const entity: Entity = {

    add: (a, b) => a + b,

    del(a, b) {

      return a - b;

    },

  };

}

{
  type AnyType = boolean;

  type AnyReturnType = string;

  type AnyNextType = number;

  function* gen(): Generator<AnyType, AnyReturnType, AnyNextType> {

    const nextValue = yield true; // nextValue 类型是 number，yield 后必须是 boolean 类型

    return `${nextValue}`; // 必须返回 string 类型

  }

  let a = gen().next()
}

{

  function log(x?: string) {

    console.log(x);

  }

  function log1(x: string | undefined) {

    console.log(x);

  }

  log();

  log(undefined);

  log1(undefined); // ts(2554) Expected 1 arguments, but got 0

  log1(undefined);


}

{
  interface P1 {

    name: string;

  }

  interface P2 extends P1 {

    age: number;

  }


  const x1 = convert({name: ""} as P1); // => number

  const x2 = convert({name: "", age: 18} as P2); // number

}

{
  interface P1 {

    name: string;

  }

  interface P2 extends P1 {

    age: number;

  }

  function convert(x: P1 | P2): any {}


  const x1 = convert({name: ''} as P1); // => number

  const x2 = convert({name: '', age: 18} as P2); // => string

}

