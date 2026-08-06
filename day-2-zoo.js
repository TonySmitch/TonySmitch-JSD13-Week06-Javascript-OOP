import {createInterface}from "node:readline";

const rl = createInterface({
input: process.stdin,
input: process.stdout,
});

// console.log(rl);
function askForCommand(){
    rl.question(
"\n[l]Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n",
(answer) => {
const command = answer.trim().toLowerCase();
if(command === "q"){
    }
    handleCommand(command);
    displayZoo();
    askForCommand();
},
    );

}

function handleCommand(command){
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
const zooName = "JS Terminal Zoo"
const visitor = new Visitor("Tony")

function showZooDirectory(){}

function displayZoo(){}

function inspectLocation(){}

function prepareAnimalFood(){}
console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
inspectLocation();
prepareAnimalFood();
askForCommand();
}
    

