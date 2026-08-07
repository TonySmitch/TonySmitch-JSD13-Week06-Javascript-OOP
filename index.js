// the Class template
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.hunger = 50;
  }

  makeSound() {
    console.log(`${this.name} makes a sound ...`);
  }

  eat() {
    this.hunger = this.hunger - 10;
    console.log(`${this.name} the ${this.species} ate. Hunger level is now ${this.hunger}.`);
  }
}

//Object instance is created
const leo = new Animal("Leo", "Lion");

console.log(leo);

console.log(leo.hunger);
leo.eat();
console.log(leo.hunger);

// specialized classes (Inheritance)
class Mammal extends Animal {
  constructor(name, species, furColor) {
    super(name, species);
    this.furColor = furColor;
  }

  groom() {
    console.log(`${this.name} is brushing their ${this.furColor} fur.`);
  }
}

class Birds extends Animal {
  constructor(name, species, wingspan) {
    super(name, species);
    this.wingspan = wingspan;
  }

  // this is an example of Polymorphism; override the parent's method
  makeSound() {
    console.log(`${this.name} chirps Tweet! Tweet!`);
  }
}

class AnimalType extends Animal {
  constructor(name, type, color, canivore) {
    super(name);
    this.type = type;
    this.color = color;
    this.canivore = canivore;
  }
}

class Snake extends AnimalType {
  constructor(name) {
    super(name, "Vertebrate");
  }

  makeSound() {
    console.log(`${this.name} Roar Foor! Foor!`);
  }

  show() {
    console.log(`${this.name} is ${this.type}`);
  }
}

const snake = new Snake("Snake");

snake.show();
snake.makeSound();

class Sponges extends AnimalType {
  constructor(name) {
    super(name, "It is an invertebrate.", " Is a yellow sea sponges that lives in the ocean. ");
  }

  makeSound() {
    console.log(`${this.name} Breath Boong! Boong!`);
  }

  show() {
    console.log(`${this.name}${this.color}${this.type}`);
  }
}

const sponges = new Sponges("Sponges");

sponges.show();
sponges.makeSound();