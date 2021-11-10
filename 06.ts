{
  class Animal {

    weight: number;

    type = 'Animal';

    constructor(weight: number) {

      this.weight = weight;

    }

    say(name: string) {

      console.log(`I'm ${name}!`);

    }

  }


  class Dog extends Animal {

    name: string;

    constructor(name: string) {

      super(1); // ts(2554) Expected 1 arguments, but got 0.

      this.name = name;

    }


    bark() {

      console.log('Woof! Woof!');

    }

  }

}

{
  class Son {

    public firstName: string;

    private lastName: string = 'Stark';

    constructor(firstName: string) {

      this.firstName = firstName;

      this.lastName; // ok

    }

  }


  const son = new Son('Tony');

  console.log(son.firstName); //  => "Tony"

  son.firstName = 'Jack';

  console.log(son.firstName); //  => "Jack"

  // console.log(son.lastName); // ts(2341) Property 'lastName' is private and only accessible within class 'Son'.

}

{
  class Son {

    public firstName: string;

    protected lastName: string = 'Stark';

    constructor(firstName: string) {

      this.firstName = firstName;

      this.lastName; // ok

    }

  }


  class GrandSon extends Son {

    constructor(firstName: string) {

      super(firstName);

    }


    public getMyLastName() {

      return this.lastName;

    }

  }


  const grandSon = new GrandSon('Tony');

  console.log(grandSon.getMyLastName()); // => "Stark"

  // grandSon.lastName; // ts(2445) Property 'lastName' is protected and only accessible within class 'Son' and its subclasses.

}

{
  class Son {

    public readonly firstName: string;

    constructor(firstName: string) {

      this.firstName = firstName;

    }

  }

  const son = new Son('Tony');

  // son.firstName = 'Jack'; // ts(2540) Cannot assign to 'firstName' because it is a read-only property.

}

{
  class Son {

    public firstName: string;

    protected lastName: string = 'Stark';

    constructor(firstName: string) {

      this.firstName = firstName;

    }

  }

  class GrandSon extends Son {

    constructor(firstName: string) {

      super(firstName);

    }

    get myLastName() {

      return this.lastName;

    }

    set myLastName(name: string) {

      if (this.firstName === 'Tony') {

        this.lastName = name;

      } else {

        console.error('Unable to change myLastName');

      }

    }

  }

  const grandSon = new GrandSon('Tony');

  console.log(grandSon.myLastName); // => "Stark"

  grandSon.myLastName = 'Rogers';

  console.log(grandSon.myLastName); // => "Rogers"

  const grandSon1 = new GrandSon('Tony1');

  grandSon1.myLastName = 'Rogers'; // => "Unable to change myLastName"

}

{
  class MyArray {

    static displayName = 'MyArray';

    static isArray(obj: unknown) {
      console.log(Object.prototype.toString.call(obj))

      return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';

    }

  }

  console.log(MyArray.displayName); // => "MyArray"

  console.log(MyArray.isArray([])); // => true

  console.log(MyArray.isArray({})); // => false

}












