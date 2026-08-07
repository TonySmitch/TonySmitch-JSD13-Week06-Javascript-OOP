
//อ้างอิงจาก day-2-zoo.js เพื่อเรียนรู้การเขียนโค้ดแบบกระชับ และ สามารถทำความเข้าใจด้วยตัวเองได้
import { createInterface } from "node:readline"; //นำเข้าฟังก์ชันรับค่าจาก Terminal 

// 1. คลาส Animal สำหรับสร้างสัตว์ (รวมคุณสมบัติไว้ในคลาสเดียว)
class Animal {//ประกาศคลาสหลักของสัตว์ รวบรวมคลาส Lion, Elephant, Bird, Bear มารวมกันเป็นคลาสเดียวเพื่อการเขียนโค้ดซ้ำซ้อน)
  constructor(name, species, symbol, sound) {//กำหนดโครงสร้างคลาส (รับค่า ชื่อ, สายพันธุ์, ไอคอนสัญลักษณ์ และเสียงร้อง)
Object.assign(this, { name, species, symbol, sound });//เปลี่ยนการเก็บแบบเดิม this.name = name; this.species = species...เป็นการเก็บไว้ใน Object  
}
  describe()/*คุณสมบัติ*/ { return `${this.name} is a ${this.species}.`; }//คืนค่าข้อความอธิบายสายพันธุ์ของสัตว์ this.species
  makeSound()/*คุณสมบัติ*/ { return `${this.name} ${this.sound}!`; }//คืนค่าข้อความเสียงร้องของสัตว์ this.sound
}

// 2. คลาส Visitor สำหรับควบคุมการเคลื่อนที่
class Visitor {//ประกาศคลาสสำหรับจัดการข้อมูลนักท่องเที่ยว
  constructor(name) { this.name = name; this.pos = 0; }//กำหนดชื่อนักท่องเที่ยว และตั้งค่าตำแหน่งเริ่มต้น (pos) ที่ index 0 (ทางเข้า)
  move(dir, maxPos) {//ยุบเมธอด moveLeft และ moveRight รวมเป็นเมธอดเดียวที่รับทิศทาง (dir) และตำแหน่งสูงสุด (maxPos)
    if (dir === "r" && this.pos < maxPos) return (this.pos++, `${this.name} walks to the right.`);//ถ้าสั่งขวาและยังไม่สุดทาง ให้ขยับตำแหน่งไปขวา 1 ช่อง แล้ว คืนข้อความเดินไปทางขวา
    if (dir === "l" && this.pos > 0) return (this.pos--, `${this.name} walks to the left.`);//ถ้าสั่งซ้ายและยังไม่ถึงทางเข้า ให้ขยับตำแหน่งไปซ้าย 1 ช่อง แล้ว คืนข้อความเดินไปทางซ้าย
    return `${this.name} is at the edge of the zoo.`;//ถ้าเดินไปต่อไม่ได้ (สุดทาง) ให้คืนข้อความแจ้งเตือน
  }
}

// 3. กำหนดข้อมูลสัตว์และสถานที่ในสวนสัตว์
const animals = [//สร้างอาร์เรย์เก็บวัตถุสัตว์ทั้ง 4 ตัวพร้อมเสียงร้องเฉพาะ
  new Animal("Simba", "lion", "🦁", "roars"),
  new Animal("Ella", "elephant", "🐘", "trumpets"),
  new Animal("Zazu", "hornbill", "🐦", "chirps"),
  new Animal("Baloo", "bear", "🐻", "growls"),
];

const zooPath = [สร้างอาร์เรย์ลำดับเส้นทางในสวนสัตว์ แต่ละจุดเก็บสัญลักษณ์ ชื่อ และ สัตว์ประจำกรง/คำอธิบาย
  { symbol: "🚪", name: "Entrance", desc: "The main entrance to the zoo." },
  { symbol: animals[0].symbol, name: "Lion enclosure", animal: animals[0] },
  { symbol: "🌳", name: "Garden", desc: "A quiet garden with shaded benches." },
  { symbol: "🐘", name: "Elephant enclosure", animal: animals[1] },
  { symbol: "🐦", name: "Aviary", animal: animals[2] },
  { symbol: "🐻", name: "Bear habitat", animal: animals[3] },
  { symbol: "🍽️", name: "Food court", desc: "Smells like popcorn and fruit." },
];

const visitor = new Visitor("Tony");//สร้างอินสแตนซ์นักท่องเที่ยวชื่อ "Tony"
const rl = createInterface({ input: process.stdin, output: process.stdout });//เปิดช่องทางอ่าน-เขียนข้อมูลใน Terminal

// 4. ฟังก์ชันแสดงผลและตรวจสอบสถานที่
const displayZoo = () => {
    //Function สำหรับแสดงแผนที่สวนสัตว์บนหน้าจอ
  const path = zooPath.map((_, i) => (i === visitor.pos ? "🧑" : "⬜")).join(" — ");
  //วนลูปสร้างทางเดิน ถ้า index ตรงกับตำแหน่งนักท่องเที่ยว (visitor.pos) ให้แสดง "🧑" นอกนั้นแสดง "⬜" แล้วเชื่อมด้วย " — "
  console.log(`\n=== JS Terminal Zoo ===\n${zooPath.map(p => p.symbol).join(" — ")}\n${path}`);//แสดง ชื่อ สัญลักษณ์สถานที่ และเส้นทางที่มีตัวละครอยู่
};

const inspect = () => {//สำรวจสถานที่ ณ จุดที่ยืนอยู่
  const loc = zooPath[visitor.pos];//ดึงข้อมูลสถานที่ปัจจุบันจาก zooPath ตามตำแหน่ง visitor.pos
  console.log(`\nYou are at: ${loc.name}`);//แสดงข้อความว่าเราอยู่สถานที่ไหนในแผนที่
  console.log(loc.animal ? `${loc.animal.describe()}\n${loc.animal.makeSound()}` : loc.desc);
  //เช็กว่าจุดนี้มีสัตว์หรือไม่ ถ้ามีให้แสดงรายละเอียดและเสียงสัตว์ ถ้าไม่มีให้แสดงคำอธิบายสถานที่
};

// 5. ระบบรับคำสั่งแบบ Loop
function askCommand() {//ฟังก์ชันวนลูปรับคำสั่งจากผู้ใช้
  rl.question("\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ", (ans) => {//แสดงเมนูและรอรับข้อความจากผู้ใช้
    const cmd = ans.trim().toLowerCase();//ตัดช่องว่างและเปลี่ยนเป็นตัวพิมพ์เล็ก
    if (cmd === "q") return (console.log("\nGoodbye!"), rl.close());//ถ้าพิมพ์ "q" ให้แสดงข้อความบอกลา แล้วปิดโปรแกรมทันที
    
    if (cmd === "l" || cmd === "r") console.log(visitor.move(cmd, zooPath.length - 1));//ถ้าพิมพ์ "l" หรือ "r" ให้สั่งนักท่องเที่ยวขยับตำแหน่งที่ละ 1 ก้าว เช่น เดินไปซ้าย และ เดินไปทางขวา
    else if (cmd === "i") inspect();//ถ้าพิมพ์ "i" ให้เรียกฟังก์ชันสำรวจพื้นที่
    else if (cmd === "d") console.table(animals.map(a => ({ name: a.name, species: a.species, symbol: a.symbol })));//ถ้าพิมพ์ "d" ให้แสดงตารางรายชื่อสัตว์
    else console.log("Please enter l, r, i, d, or q.");//ถ้าพิมพ์ตัวอื่น ให้แจ้งเตือนคำสั่งไม่ถูกต้อง

    displayZoo();
    askCommand();
  });
}

// เริ่มต้นรันโปรแกรม
displayZoo();//วาดแผนที่เริ่มต้น
inspect();//แสดงรายละเอียดสถานที่เริ่มต้น (Entrance)
askCommand();//เริ่มรับคำสั่งแรกจากผู้ใช้