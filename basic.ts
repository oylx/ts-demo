// 1.联合类型
// 联合类型使用 “｜”表示或的关系， 满足其中的一个情况即可。
{
  interface Bird {
    name: string;
    fly(): void;
  }
  interface Person {
    name: string;
    talk(): void;
  }
  type BirdPerson = Bird | Person;
  let p: BirdPerson = { name: "seven", fly() {} };
  let p1: BirdPerson = { name: "seven", talk() {} };
}

// 2.交叉类型
// 交叉类型使用“&”，表示与的关系，需要满足所有的情况。
{
  interface Bird {
    name: string;
    fly(): void;
  }
  interface Person {
    name: string;
    talk(): void;
  }
  type BirdPerson = Bird & Person;
  let p: BirdPerson = { name: "seven", fly() {}, talk() {} };
}

// 3.内置条件类型
{
  type Extract<T, U> = T extends U ? T : never;
  type Exclude<T, U> = T extends U ? never : T;
  type NonNullable<T> = T extends null | undefined ? never : T;

  type N = NonNullable<string | number | null | undefined>; // 删除null和undefined;
  type E = Exclude<string | number, string>; // 排除关系 输出 number;
  type I = Extract<string | number, string>; // 包含关系 输出 string;

  let a: E = 1;
  let i: I = "2";
  const fn = (a: E): I => {
    return "1";
  };
}

// 4.函数的类型推断
// 4.1获取函数返回值的类型
// infer 最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量
{
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

  function getUserInfo1(name: string, age: number) {
    return { name, age };
  }
  type UserInfo = ReturnType<typeof getUserInfo1>;

  const userA: UserInfo = {
    name: "seven",
    age: 10,
  };
}
{
  interface User {
    name: string;
    age: number;
  }
  type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
  type Func = () => User;
  type Test = ReturnType<Func>; // Test = User
  let a: Test = {
    name: "seven",
    age: 10,
  };
}

// 4.2获取函数参数的类型
// 在这个条件语句 T extends (...args: infer R) => any ? R : T 中，infer R 表示待推断的函数参数。
// 整句表示为：如果 T 能赋值给 (...args: infer R) => any，则结果是 (...args: infer R) => any 类型中的参数 P，否则返回为 T
{
  type Parameters<T> = T extends (...args: infer R) => any ? R : any;
  function getUserInfo(name: string, age: number) {
    return { name, age };
  }
  type T1 = Parameters<typeof getUserInfo>; // [name: string, age: number]
}
{
  type ParamType<T> = T extends (...args: infer P) => any ? P : T;
  interface User {
    name: string;
    age: number;
  }
  type Func = (user: User) => void;
  type Param = ParamType<Func>; // Param = [name: string, age: number]
  type AA = ParamType<string>; // string
  let x: Param = [
    {
      name: "seven",
      age: 10,
    },
  ];
  let z: AA = "1234";
}

// 5.泛型进阶
// 5.1 Pick 提取字段
{
  // pick 的原理
  // type Pick<T, K extends keyof T> = { [P in K]: T[P] };
  interface Person {
    name: string;
    age: number;
    visible: boolean;
  }
  // Person1 就包含 name,age 字段。
  type Person1 = Pick<Person, "name" | "age">;
}
// 5.2 Omit 反向获取
{
  // keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
  interface Person {
    name: string;
    age: number;
    visible: boolean;
  }
  type K1 = keyof Person; // "name" | "age" | "location"
  type K2 = keyof Person[]; // number | "length" | "push" | "concat" | ...
  type K3 = keyof { [x: string]: Person }; // string | number

  type Exclude<T, U> = T extends U ? never : T;
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type Person2 = Omit<Person, "name">;
  type Person3 = Omit<Person, "age">;
}
// 5.3 两个接口的操作
// 我们把一个接口当作一个集合，那么两个集合的操作主要有：并集，交集，差集

// 5.4 交集的定义：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
// 通过Intersection实现交集，可以获得一个新接口，C3只包含 name/age
{
  type Extract<T, U> = T extends U ? T : never;
  type Intersection<T extends object, U extends object> = Pick<
    T,
    Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
  >;

  type C1 = { name: string; age: number; visible: boolean };
  type C2 = { name: string; age: number; sex: number };

  type C3 = Intersection<C1, C2>;
}

// 5.5差集的定义：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
// 通过Diff实现差集，可以获得一个新接口，C3只包含visible。
{
  type Exclude<T, U> = T extends U ? never : T;
  type Diff<T extends object, U extends object> = Pick<
    T,
    Exclude<keyof T, keyof U>
  >;

  type C1 = { name: string; age: number; visible: boolean };
  type C2 = { name: string; age: number; sex: number };

  type C3 = Diff<C1, C2>;
  type C4 = Diff<C2, C1>;
}

// 5.6并集的定义：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。通过Merge实现并集，可以获得一个新接口，C3包含C1，C2 的所有属性
// Compute的作用是将交叉类型合并
{
  type Compute<A extends any> = A extends Function
    ? A
    : { [K in keyof A]: A[K] };
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
  type Merge<O1 extends object, O2 extends object> = Compute<
    O1 & Omit<O2, keyof O1>
  >;
  type C1 = { name: string; age: number; visible: boolean };
  type C2 = { name: string; age: number; sex: number };

  type C3 = Merge<C1, C2>;
  type C4 = Omit<C1, C2>;
}

// 5.7特殊的情况：Overwrite（覆盖）
{
  type C1 = { name: string; age: number; visible: boolean };
  type C2 = { name: string; age: string; sex: number };
  type Exclude<T, U> = T extends U ? never : T;
  type Diff<T extends object, U extends object> = Pick<
    T,
    Exclude<keyof T, keyof U>
  >;
  type Extract<T, U> = T extends U ? T : never;
  type Intersection<T extends object, U extends object> = Pick<
    T,
    Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
  >;
  type Overwrite<
    T extends object,
    U extends object,
    I = Diff<T, U> & Intersection<U, T>
  > = Pick<I, keyof I>;

  type overwrite = Overwrite<C1, C2>;
}
