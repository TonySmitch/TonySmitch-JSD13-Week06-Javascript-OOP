
import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", answer => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});

// the Class template
class Animal {
  constructor(name, species, type, group ) {
    this.name = name;
    this.species = species;
    this.type = type;
    this.group = group;
    this.hunger = 50;
    this.shower += 10;
    this.happy +=20
  }

  makeSound() {
    console.log(`${this.name} makes a sound ...`);
  }

  feed() {
    this.hunger = this.hunger - 10;
    console.log(`${this.name} the ${this.species} ate. Hunger level is now ${this.hunger}.`);
  }
  bathe() {
    this.shower = this.shower + 10;
    console.log(`${this.name} the ${this.species} ate. Shower level is now ${this.shower}.`);
  }
  play() {
    this.happy = this.happy + 10;
    console.log(`${this.name} the ${this.species} ate. Happy level is now ${this.happy}.`);
  }
}


