{
  let reflect = <P>(param: P): P => {
    return param;
  };

  const reflectStr = reflect<string>("string"); // str 类型是 string
  console.log(reflectStr);

  const reflectNum = reflect<number>(1); // num 类型 number
  console.log(reflectNum);
}
