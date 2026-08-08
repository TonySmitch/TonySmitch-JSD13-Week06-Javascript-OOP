import { createInterface } from "node:readline";

class Animal {
  constructor(name, species, symbol, sound) {
    Object.assign(this, { name, species, symbol, sound });
  }
  describe() {
    return `${this.name} is a ${this.species}.`;
  }
  makeSound() {
    return `${this.name} ${this.sound}!`;
  }
}

class Visitor {
  constructor(name) {
    this.name = name;
    this.pos = 0;
  }
  move(dir, maxPos) {
    if (dir === "r" && this.pos < maxPos) return (this.pos++, `${this.name} walks to the right.`);
    if (dir === "l" && this.pos > 0) return (this.pos--, `${this.name} walks to the left.`);
    return `${this.name} is at the edge of the zoo.`;
  }
}

const animals = [
  new Animal("Simba", "lion", "🦁", "roars"),
  new Animal("Ella", "elephant", "🐘", "trumpets"),
  new Animal("Zazu", "hornbill", "🐦", "chirps"),
  new Animal("Baloo", "bear", "🐻", "growls"),
];

const zooPath = [
  { symbol: "🚪", name: "Entrance", desc: "The main entrance to the zoo." },
  { symbol: animals[0].symbol, name: "Lion enclosure", animal: animals[0] },
  { symbol: "🌳", name: "Garden", desc: "A quiet garden with shaded benches." },
  { symbol: "🐘", name: "Elephant enclosure", animal: animals[1] },
  { symbol: "🐦", name: "Aviary", animal: animals[2] },
  { symbol: "🐻", name: "Bear habitat", animal: animals[3] },
  { symbol: "🍽️", name: "Food court", desc: "Smells like popcorn and fruit." },
];

const visitor = new Visitor("Tony");
const rl = createInterface({ input: process.stdin, output: process.stdout });

const displayZoo = () => {
  const path = zooPath.map((_, i) => (i === visitor.pos ? "🧑" : "⬜")).join(" — ");
  console.log(`\n=== JS Terminal Zoo ===\n${zooPath.map(p => p.symbol).join(" — ")}\n${path}`);
};

const inspect = () => {
  const loc = zooPath[visitor.pos];
  console.log(`\nYou are at: ${loc.name}`);
  console.log(loc.animal ? `${loc.animal.describe()}\n${loc.animal.makeSound()}` : loc.desc);
};

// ---------------- เพิ่มระบบรอบและสัตว์ใหม่ ----------------
let rounds = 0;
const initialAnimals = [...animals];
const initialZooPath = [...zooPath];

const emojiMap = {
  cheetah: "🐆",
  giraffe: "🦒",
  zebra: "🦓",
  panda: "🐼",
  kangaroo: "🦘",
  lion: "🦁",
  elephant: "🐘",
  bear: "🐻",
  hornbill: "🐦",
  penguin: "🐧" // เพิ่มชนิดที่ 10
};

const soundMap = {
  cheetah: "purrs",
  giraffe: "hums softly",
  zebra: "neighs",
  panda: "munches bamboo",
  kangaroo: "thumps",
  lion: "roars",
  elephant: "trumpets",
  bear: "growls",
  hornbill: "chirps",
  penguin: "squawks" // เสียงของเพนกวิน
};

const apiKey = "1UYe1gN8Mudr6olNxJjEsCI5GAVcxrs79DG97jUK";

function moveVisitor(dir) {
  const msg = visitor.move(dir, zooPath.length - 1);

  if (visitor.pos === zooPath.length - 1 && dir === "r") {
    if (rounds >= 10) {
      console.log("\nขอบคุณที่ใช้บริการ แล้วพบกันใหม่ 🚪");
      resetZoo();
    } else {
      console.log("\nคุณเดินมาถึงทางออกแล้ว 🚪");
      rounds++;
      addRandomAnimalFromAPI();
    }
  }
  return msg;
}

function resetZoo() {
  animals.length = 0;
  zooPath.length = 0;
  animals.push(...initialAnimals);
  zooPath.push(...initialZooPath);
  visitor.pos = 0;
  rounds = 0;
  console.log("\nสวนสัตว์ถูกรีเซ็ตกลับไปยังค่าเริ่มต้นแล้ว ✅");
}

function addRandomAnimalFromAPI() {
  const candidates = ["cheetah", "giraffe", "zebra", "panda", "kangaroo", "penguin"];
  const name = candidates[Math.floor(Math.random() * candidates.length)];

  fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
    method: "GET",
    headers: { "X-Api-Key": apiKey }
  })
    .then(res => res.json())
    .then(data => {
      const info = data[0];
      const symbol = emojiMap[name] || "🆕";
      const sound = soundMap[name] || "makes a sound";
      const newAnimal = new Animal(
        info.name,
        info.characteristics.class || "unknown species",
        symbol,
        sound
      );
      animals.push(newAnimal);
      zooPath.splice(zooPath.length - 1, 0, {
        symbol: newAnimal.symbol,
        name: `${newAnimal.name} enclosure`,
        animal: newAnimal
      });
      console.log(`\nสัตว์ใหม่ถูกเพิ่ม: ${newAnimal.name} ${newAnimal.symbol}!`);
    })
    .catch(err => console.error("Failed to add animal:", err));
}

// ---------------- คำสั่งหลัก ----------------
function askCommand() {
  rl.question("\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ", (ans) => {
    const cmd = ans.trim().toLowerCase();
    if (cmd === "q") return (console.log("\nGoodbye!"), rl.close());
    if (cmd === "l" || cmd === "r") console.log(moveVisitor(cmd));
    else if (cmd === "i") inspect();
    else if (cmd === "d") console.table(animals.map(a => ({ name: a.name, species: a.species, symbol: a.symbol })));
    else console.log("Please enter l, r, i, d, or q.");
    displayZoo();
    askCommand();
  });
}

displayZoo();
inspect();
askCommand();
