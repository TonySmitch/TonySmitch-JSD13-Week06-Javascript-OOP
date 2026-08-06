const readline = require('readline');

// 1. กำหนดข้อมูลสถานที่และสัตว์ต่างๆ ในสวนสัตว์
const locations = [
  { name: "Entrance", emoji: "🚪", inspect: "Welcome to the JS Zoo!" },
  { name: "Lion habitat", emoji: "🦁", inspect: "Simba is a lion.\nSimba roars!" },
  { name: "Park", emoji: "🌳", inspect: "A quiet green park with shade." },
  { name: "Elephant habitat", emoji: "🐘", inspect: "Dumbo is an elephant.\nDumbo trumpets!" },
  { name: "Bird habitat", emoji: "🐧", inspect: "Pingu is a penguin.\nPingu waddles!" },
  { name: "Bear habitat", emoji: "🐻", inspect: "Baloo is a bear.\nBaloo growls!" },
  { name: "Food court", emoji: "🍽️", inspect: "The food court smells like popcorn and fresh fruit." }
];

// 2. ตัวแปรเก็บสถานะผู้เล่น
let playerPos = 5; // เริ่มต้นที่กรงหมี (Index 5)
const playerName = "Neeti";

// ตั้งค่า Readline สำหรับรับ Input ทาง Terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 3. ฟังก์ชันสำหรับวาดแผนที่บน Terminal
function renderMap() {
  console.log("\n=== JS Terminal Zoo ===");
  
  // แถวบน: แสดง Emoji สถานที่ทั้งหมด
  const topRow = locations.map(loc => loc.emoji).join(" - ");
  console.log(topRow);

  // แถวล่าง: แสดงช่องสี่เหลี่ยม และ Emoji ตัวละครตามตำแหน่งปัจจุบัน
  const bottomRow = locations.map((_, idx) => {
    return idx === playerPos ? "👱" : "⬜";
  }).join(" - ");
  console.log(bottomRow + "\n");
}

// 4. Game Loop สำหรับรับและประมวลผลคำสั่ง
function promptUser() {
  rl.question('[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ', (input) => {
    const command = input.trim().toLowerCase();

    switch (command) {
      case 'l': // เดินซ้าย
        if (playerPos > 0) {
          playerPos--;
          console.log(`\n${playerName} walks to the left.`);
        } else {
          console.log("\nYou are at the entrance! Can't go further left.");
        }
        renderMap();
        break;

      case 'r': // เดินขวา
        if (playerPos < locations.length - 1) {
          playerPos++;
          console.log(`\n${playerName} walks to the right.`);
        } else {
          console.log("\nYou reached the end of the zoo!");
        }
        renderMap();
        break;

      case 'i': // สำรวจสถานที่ปัจจุบัน
        const currentLoc = locations[playerPos];
        console.log(`\nYou are at: ${currentLoc.name}`);
        console.log(currentLoc.inspect);
        renderMap();
        break;

      case 'd': // ดูรายชื่อสถานที่ทั้งหมด (Directory)
        console.log("\n=== Zoo Directory ===");
        locations.forEach((loc, index) => {
          console.log(`[${index + 1}] ${loc.emoji} ${loc.name}`);
        });
        console.log();
        renderMap();
        break;

      case 'q': // ออกจากเกม
        console.log("\nThanks for visiting JS Terminal Zoo! Bye!");
        rl.close();
        return;

      default:
        console.log("\nInvalid command! Please choose l, r, i, d, or q.");
        break;
    }

    // วนลูปรับคำสั่งต่อ
    promptUser();
  });
}

// เริ่มต้นรันเกม
promptUser();