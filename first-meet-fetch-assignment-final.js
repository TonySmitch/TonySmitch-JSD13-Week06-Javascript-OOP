const name = 'cheetah'; 
const apiKey = '1UYe1gN8Mudr6olNxJjEsCI5GAVcxrs79DG97jUK';
fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
  const cheetah = data[0];
  console.log('ชื่อ:', cheetah.name);
  console.log('อายุขัย:', cheetah.characteristics.lifespan);
  console.log('น้ำหนัก:', cheetah.characteristics.weight);
  })
  .catch(error => {
    console.error('Request failed:', error.message);
  });

import { createInterface } from "node:readline"; 


class Animal {
  constructor(name, species, symbol, sound) {
Object.assign(this, { name, species, symbol, sound });  
}
  describe()/*คุณสมบัติ*/ { return `${this.name} is a ${this.species}.`; }
  makeSound()/*คุณสมบัติ*/ { return `${this.name} ${this.sound}!`; }
}


class Visitor {
  constructor(name) { this.name = name; this.pos = 0; }
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


function askCommand() {
  rl.question("\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ", (ans) => {
    const cmd = ans.trim().toLowerCase();
    if (cmd === "q") return (console.log("\nGoodbye!"), rl.close());
    
    if (cmd === "l" || cmd === "r") console.log(visitor.move(cmd, zooPath.length - 1));
    else if (cmd === "i") inspect();
    else if (cmd === "d") console.table(animals.map(a => ({ name: a.name, species: a.species, symbol: a.symbol })));//ถ้าพิมพ์ "d" ให้แสดงตารางรายชื่อสัตว์
    else console.log("Please enter l, r, i, d, or q.");

    displayZoo();
    askCommand();
  });
}


displayZoo();
inspect();
askCommand();