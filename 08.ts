// 联合类型（Unions）用来表示变量、参数的类型不是单一原子类型，而可能是多种不同的类型的组合
type Day = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
const SUNDAY: Day = 'SUNDAY';
const SATURDAY: Day = 'SATURDAY';

function formatPX(size: unknown) {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  if (typeof size === 'string') {
    return `${parseInt(size) || 0}px`;
  }
  throw Error(` 仅支持 number 或者 string`);
}
let c: string = formatPX(13);
let b: string = formatPX('13px');
formatPX(true);
formatPX(null);
console.log(c)
console.log(b)

type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型是 'vh' | 'vw' | 'px' | 'em' | 'rem'


interface Fish {
  swim(): void;
  layEggs(): void;
}
interface Bird {
  fly(): void;
  layEggs(): void;
}
type petType = () => Bird | Fish
const getPet: petType = () => {
  return {
    layEggs(){},
    fly(){}
  } as Fish | Bird;

};
const Pet = getPet();
Pet.layEggs(); // ok
// Pet.fly(); // ts(2339) 'Fish' 没有 'fly' 属性; 'Bird | Fish' 没有 'fly' 属性


{
  type Useless = string & number;
  let use = 1;
}

// 联合类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型
type IntersectionType = { id: number; name: string; } & { age: number };
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18
}

type IntersectionTypeConfict = { id: number; name: string; }
  & { age: number; name: number; };
const mixedConflict: IntersectionTypeConfict = {
  id: 1,
  name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
  age: 2
};

type IntersectionTypeConfict1 = { id: number; name: 2; }
  & { age: number; name: number; };
let mixedConflict1: IntersectionTypeConfict1 = {
  id: 1,
  name: 2, // ok
  age: 2
};
mixedConflict1 = { id: 1, name: 2, };

type UnionIntersectionA = { id: number; } & { name: string; } | { id: string; } & { name: number; }; // 交叉操作符优先级高于联合操作符
type UnionIntersectionB = ('px' | 'em' | 'rem' | '%') | ('vh' | 'em' | 'rem' | 'pt'); // 调整优先级

type UnionIntersectionC = ({ id: number; } & { name: string; } | { id: string; }) & { name: number; };
type UnionIntersectionD = { id: number; } & { name: string; } & { name: number; } | { id: string; } & { name: number; }; // 满足分配率
type UnionIntersectionE = ({ id: string; } | { id: number; } & { name: string; }) & { name: number; }; // 满足交换律




































