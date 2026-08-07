import { createInterface } from "node:readline";

class Animal {
  constructor(name, species, symbol) {
    this.name = name;
    this.species = species;
    this.symbol = symbol;
  }

  describe() {
    return `${this.name} is a ${this.species}.`;
  }

  makeSound() {
    return `${this.name} makes a sound.`;
  }
}

class Lion extends Animal {
  constructor(name) {
    super(name, "lion", "🦁");
  }

  makeSound() {
    return `${this.name} roars!`;
  }
}

class Elephant extends Animal {
  constructor(name) {
    super(name, "elephant", "🐘");
  }

  makeSound() {
    return `${this.name} trumpets!`;
  }
}

class Bird extends Animal {
  constructor(name) {
    super(name, "hornbill", "🐦");
  }

  makeSound() {
    return `${this.name} chirps!`;
  }
}

class Bear extends Animal {
  constructor(name) {
    super(name, "bear", "🐻");
  }

  makeSound() {
    return `${this.name} growls!`;
  }
}

class Visitor {
  constructor(name, position = 0) {
    this.name = name;
    this.position = position;
  }

  moveRight(maximumPosition) {
    if (this.position < maximumPosition) {
      this.position++;
      return `${this.name} walks to the right.`;
    }

    return `${this.name} is already at the end of the zoo path.`;
  }

  moveLeft() {
    if (this.position > 0) {
      this.position--;
      return `${this.name} walks to the left.`;
    }

    return `${this.name} is already at the entrance.`;
  }
}

const animals = [
  new Lion("Simba"),
  new Elephant("Ella"),
  new Bird("Zazu"),
  new Bear("Baloo"),
];

const zooPath = [
  {
    symbol: "🚪",
    name: "Entrance",
    description:
      "The main entrance to the zoo. The morning visitors are arriving.",
  },
  {
    symbol: animals[0].symbol,
    name: "Lion enclosure",
    animal: animals[0],
  },
  {
    symbol: "🌳",
    name: "Garden",
    description: "A quiet garden with large trees and shaded benches.",
  },
  {
    symbol: animals[1].symbol,
    name: "Elephant enclosure",
    animal: animals[1],
  },
  {
    symbol: animals[2].symbol,
    name: "Aviary",
    animal: animals[2],
  },
  {
    symbol: animals[3].symbol,
    name: "Bear habitat",
    animal: animals[3],
  },
  {
    symbol: "🍽️",
    name: "Food court",
    description: "The food court smells like popcorn and fresh fruit.",
  },
];

const zooName = "JS Terminal Zoo";
const visitor = new Visitor("Neeti");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showZooDirectory() {
  console.log("\nZoo directory");
  console.table(
    animals.map((animal) => ({
      name: animal.name,
      species: animal.species,
      symbol: animal.symbol,
    })),
  );
}

function displayZoo() {
  const bannerRow = [`=== ${zooName} ===`];
  const placesRow = zooPath.map((location) => location.symbol);
  const pathwayRow = zooPath.map(() => "⬜");

  pathwayRow[visitor.position] = "🧑";

  console.log("");
  console.log(bannerRow.join(""));
  console.log(placesRow.join(" — "));
  console.log(pathwayRow.join(" — "));
}

function inspectLocation() {
  const location = zooPath[visitor.position];

  console.log(`\nYou are at: ${location.name}`);

  if (location.animal) {
    console.log(location.animal.describe());
    console.log(location.animal.makeSound());
  } else {
    console.log(location.description);
  }
}

function handleCommand(command) {
  if (command === "l") {
    console.log(visitor.moveLeft());
  } else if (command === "r") {
    console.log(visitor.moveRight(zooPath.length - 1));
  } else if (command === "i") {
    inspectLocation();
  } else if (command === "d") {
    showZooDirectory();
  } else {
    console.log("Please enter l, r, i, d, or q.");
  }
}

function prepareAnimalFood() {
  console.log("\nThe zookeeper is preparing the animal feed...");

  setTimeout(() => {
    console.log("The animal feed is ready.");
  }, 9000);

  console.log("Visitors can continue exploring.");
}

function askForCommand() {
  rl.question(
    "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ",
    (answer) => {
      const command = answer.trim().toLowerCase();

      if (command === "q") {
        console.log("\nThank you for visiting the JS Terminal Zoo.");
        rl.close();
        return;
      }

      handleCommand(command);
      displayZoo();
      askForCommand();
    },
  );
}

console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
inspectLocation();
prepareAnimalFood();
askForCommand();