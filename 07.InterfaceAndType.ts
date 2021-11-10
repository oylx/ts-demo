function Study(language: { name: string; age: () => number }) {
  console.log(`ProgramLanguage ${language.name} created ${language.age()} years ago.`);
}

Study({
  name: 'TypeScript',
  age: () => new Date().getFullYear() - 2012

});

interface ProgramLanguage {
  name: string;
  age: () => number;
}

interface OptionalProgramLanguage {

  name: string;
  age?: () => number;
}

let OptionalTypeScript: OptionalProgramLanguage = {
  name: 'TypeScript'
};

interface OptionalProgramLanguage2 {
  name: string;
  age: (() => number) | undefined;
}

let a: OptionalProgramLanguage2 = {
  name: '1234',
  age: () => { return 1}
}

{
  interface ReadOnlyProgramLanguage {
    readonly name: string;
    readonly age: (() => number) | undefined;
  }


  let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
    name: 'TypeScript',
    age: undefined
  }
  /** ts(2540)错误，name 只读 */
  // ReadOnlyTypeScript.name = 'JavaScript';
  console.log(ReadOnlyTypeScript.name)
}

{
  interface StudyLanguage {
    (language: ProgramLanguage): void
  }

  let StudyInterface: StudyLanguage = language => console.log(`${language.name} ${language.age()}`);

}

{
  interface LanguageRankInterface {
    [rank: number]: string;
  }

  interface LanguageYearInterface {
    [name: string]: number;
  }

  {
    let LanguageRankMap: LanguageRankInterface = {
      1: 'TypeScript', // ok
      2: 'JavaScript', // ok
      // 'WrongINdex': '2012' // ts(2322) 不存在的属性名
    };


    let LanguageMap: LanguageYearInterface = {
      TypeScript: 1234, // ok
      JavaScript: 1995, // ok
      1: 1970 // ok
    };
  }
}

{
  interface StringMap {
    [prop: string]: number;

    age: number; // ok
    // name: string; // ts(2411) name 属性的 string 类型不能赋值给字符串索引类型 number
  }

  interface NumberMap {
    [rank: number]: string;

    1: string; // ok
    // 0: number; // ts(2412) 0 属性的 number 类型不能赋值给数字索引类型 string
  }

  interface LanguageRankInterface {
    // name: string; // ok
    0: number; // ok
    // [rank: number]: string; // TS2413: Numeric index type 'string' is not assignable to string index type 'number'
    [name: string]: number;
  }

  interface LanguageParent {
    [rank: number]: string;

    name: string; // ok
  }

  interface LanguageSon extends LanguageParent {
    rank: number; // ok
  }

  let a: LanguageSon = {
    name: '1234',
    rank: 2
  }
}

/** 类型别名 */
{
  type LanguageType = {
    /** 以下是接口属性 */
    /** 语言名称 */
    name: string;
    /** 使用年限 */
    age: () => number;

  }
}
{

  /** 联合 */
  type MixedType = string | number;
  /** 交叉 */
  type IntersectionType = { id: number; name: string; } & { age: number; name: string };
  /** 提取接口属性类型 */
  type AgeType = ProgramLanguage['age'];

}

{
  interface Language {
    id: number;
  }
  interface Language {
    name: string;
  }
  let lang: Language = {
    id: 1, // ok
    name: 'name' // ok
  }
}

{
  /** ts(2300) 重复的标志 */
  type Language1 = {
    id: number;
  }
  /** ts(2300) 重复的标志 */
  type Language1 = {
    name: string;
  }
  let lang: Language1 = {
    id: 1,
    name: 'name'
  }
}





















