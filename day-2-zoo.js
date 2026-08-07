import { createInterface } from "node:readline";

class Animal {
  constructor(name, species, emoji) {
    this.name = name;
    this.species = species;
    this.emoji = emoji;

    // กำหนดสถานะเริ่มต้น
    this.hunger = 50; // 0 คืออิ่มเต็มที่, 100 คือหิวจัด
    this.shower = 50; // 100 คือสะอาดเต็มที่
    this.happy = 50; // 100 คือมีความสุขเต็มที่
  }

  makeSound() {
    console.log(`\n🔊 ${this.emoji} ${this.name} ส่งเสียงร้องทักทาย!`);
  }
}

class Visitor {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  moveLeft() {
    if (this.position > 0) {
      this.position--;
      return "Moved left.";
    }
    return "You are already at the beginning of the zoo.";
  }

  moveRight(maxIndex) {
    if (this.position < maxIndex) {
      this.position++;
      return "Moved right.";
    }
    return "You are already at the end of the zoo.";
  }
}

const zoo = [
  new Animal("Baloo", "หมี (Bear)", "🐻"),
  new Animal("Simba", "สิงโต (Lion)", "🦁"),
  new Animal("Dumbo", "ช้าง (Elephant)", "🐘"),
  new Animal("Pingu", "เพนกวิน (Penguin)", "🐧"),
];

const zooPath = [
  {
    symbol: "🚪",
    name: "Entrance",
    description:
      "The main entrance to the zoo. The morning visitors are arriving.",
  },
  {
    symbol: zoo[0].emoji,
    name: "Bear enclosure",
    animal: zoo[0],
  },
  {
    symbol: "🌳",
    name: "Garden",
    description: "A quiet garden with large trees and shaded benches.",
  },
  {
    symbol: zoo[1].emoji,
    name: "Lion enclosure",
    animal: zoo[1],
  },
  {
    symbol: zoo[2].emoji,
    name: "Elephant enclosure",
    animal: zoo[2],
  },
  {
    symbol: zoo[3].emoji,
    name: "Aviary",
    animal: zoo[3],
  },
  {
    symbol: "🍽️",
    name: "Food court",
    description: "The food court smells like popcorn and fresh fruit.",
  },
];

const zooName = "JS Terminal Zoo";
const visitor = new Visitor("Tony");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showZooDirectory() {
  console.log("\nZoo Directory:");
  zooPath.forEach((location, index) => {
    console.log(`${index}. ${location.symbol} ${location.name}`);
  });
}

// ----------------------------------------------------
// ✅ อัปเดตฟังก์ชันแสดงผลแผนที่และตำแหน่ง Visitor
// ----------------------------------------------------
function displayZoo() {
  console.log(`\n=== ${zooName} ===`);

  // สร้างแถวสัญลักษณ์สถานที่
  const pathRow = zooPath.map((loc) => loc.symbol).join(" - ");
  console.log(pathRow);

  // สร้างแถวระบุตำแหน่งตัวละคร
  const visitorRow = zooPath
    .map((_, index) => (index === visitor.position ? "👤" : "⬜"))
    .join(" - ");
  console.log(visitorRow);

  const location = zooPath[visitor.position];
  console.log(`Current location: ${location.symbol} ${location.name}`);
}

function inspectLocation() {
  const location = zooPath[visitor.position];
  console.log(`\nInspecting ${location.name}`);
  if (location.description) {
    console.log(location.description);
  }
  if (location.animal) {
    console.log(
      `Animal: ${location.animal.emoji} ${location.animal.name} (${location.animal.species})`
    );
  }
}

function prepareAnimalFood() {
  console.log("\nPreparing animal food...");
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
    console.log("Please enter l, r, i, d, or q");
  }
}

function askForCommand() {
  rl.question(
    "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ",
    (answer) => {
      const command = answer.trim().toLowerCase();
      if (command === "q") {
        console.log("Goodbye.");
        rl.close();
        return;
      }
      handleCommand(command);
      displayZoo();
      askForCommand();
    }
  );
}

console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
inspectLocation();
prepareAnimalFood();
askForCommand();