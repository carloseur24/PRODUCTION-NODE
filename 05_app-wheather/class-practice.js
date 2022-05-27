// a class always have a constructor, this create an initialize the state of a class

// a method isn't more that a function into a class 


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`hello my name is ${this.name} and i'm ${this.age}`)
    }
    static definition() {
        console.log('A person is a human BEING')
    }
}

let person = new Person('Carlos', 20); //instantiating the method greeting from class Person() 

person.greeting() // this method has to be instantiated

Person.definition() //static method, this are called in Js without instantiating a class

// Herence
/*
Super is used to aplicating herence in constructor method in this case my constructor herenced the parameters 
of class Person and i'm adding one new parameter
*/
class Develop extends Person {
    constructor(name,age, lastname,type){
        super(name,age);
        this.lastname = lastname;
        this.type = type;
    }
    greetingDevelop() {
        this.greeting();
        console.log(`I'm a software developer, ${this.lastname} is my lastname and work in ${this.type} development`)
    }
}
let develop = new Develop('Carlos', 20, 'Uzcategui','Frontend');
develop.greetingDevelop()

// Real face of a class

// all class are functions 