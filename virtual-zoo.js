import readline from 'readline';

// 1. คลาส Animal พร้อมเงื่อนไขการทำงาน
class Animal {
  constructor(name, species, emoji) {
    this.name = name;
    this.species = species;
    this.emoji = emoji;
    
    // กำหนดสถานะเริ่มต้น
    this.hunger = 50; // 0 คืออิ่มเต็มที่, 100 คือหิวจัด
    this.shower = 50; // 100 คือสะอาดเต็มที่
    this.happy = 50;  // 100 คือมีความสุขเต็มที่
  }

  makeSound() {
    console.log(`\n🔊 ${this.emoji} ${this.name} ส่งเสียงร้องทักทาย!`);
  }

  // 🍎 ป้อนอาหาร
  feed() {
    // ถ้าอิ่มอยู่แล้ว (ความหิวเป็น 0) แต่ยังป้อนอีก -> ตาย!
    if (this.hunger === 0) {
      console.log(`\n💀 ☠️  ${this.name} กินอาหารมากเกินไปจน... ตาย!`);
      return 'DEAD';
    }

    this.hunger = Math.max(0, this.hunger - 25);
    console.log(`\n🍎 คุณให้ขนมแก่ ${this.name}`);
    
    if (this.hunger === 0) {
      console.log(`😋 ${this.name} อิ่มแล้ว! (ความหิว = 0)`);
    } else {
      console.log(`   ระดับความหิวเหลือ: ${this.hunger}`);
    }
    return 'OK';
  }

  // 🧼 อาบน้ำ
  bathe() {
    // ถ้าความสะอาดครบ 100 แล้วแต่ยังอาบอีก -> บาดเจ็บ!
    if (this.shower === 100) {
      console.log(`\n🩹 🤕 คุณขัดผิวมากเกินไปจน... ${this.name} สัตว์บาดเจ็บ!`);
      return 'INJURED';
    }

    this.shower = Math.min(100, this.shower + 25);
    console.log(`\n🧼 คุณอาบน้ำขัดตัวให้ ${this.name}`);
    console.log(`   ระดับความสะอาดเพิ่มเป็น: ${this.shower}`);
    return 'OK';
  }

  // ⚽ เล่นด้วยกัน
  play() {
    // ถ้าความสุขครบ 100 แล้วแต่ยังเล่นอีก -> เหนื่อยมาก!
    if (this.happy === 100) {
      console.log(`\n🥵 😫 เล่นมากเกินไปจน... ${this.name} เหนื่อยมาก!`);
      return 'EXHAUSTED';
    }

    this.happy = Math.min(100, this.happy + 25);
    console.log(`\n⚽ คุณวิ่งเล่นกับ ${this.name} อย่างสนุกสนาน!`);
    console.log(`   ระดับความสุขเพิ่มเป็น: ${this.happy}`);
    return 'OK';
  }

  // เช็กว่าสถานะเต็มหมดหรือยัง (ความสะอาด 100, ความหิว 0, ความสุข 100)
  isPerfect() {
    return this.hunger === 0 && this.shower === 100 && this.happy === 100;
  }

  // แสดงสถานะปัจจุบัน
  showStatus() {
    console.log(`-------------------------------------------`);
    console.log(`${this.emoji}  ${this.name} (${this.species})`);
    console.log(`   🍗 ความหิว : ${this.hunger}/100 (0 คืออิ่มแล้ว)`);
    console.log(`   🧼 ความสะอาด: ${this.shower}/100`);
    console.log(`   😊 ความสุข  : ${this.happy}/100`);
    console.log(`-------------------------------------------`);
  }
}

// 2. สร้างรายการสัตว์ในสวนสัตว์
const zoo = [
  new Animal("Baloo", "หมี (Bear)", "🐻"),
  new Animal("Simba", "สิงโต (Lion)", "🦁"),
  new Animal("Dumbo", "ช้าง (Elephant)", "🐘"),
  new Animal("Pingu", "เพนกวิน (Penguin)", "🐧")
];

// 3. ตั้งค่า Readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userName = "";

// 4. จุดเริ่มต้นเกม
function start() {
  console.log("===========================================");
  console.log("   🎪 ยินดีต้อนรับสู่ TAMAGOTCHI ZOO 🎪   ");
  console.log("===========================================");
  
  rl.question("กรุณาใส่ชื่อผู้ดูแลสวนสัตว์: ", (answer) => {
    userName = answer.trim() || "ผู้ดูแล";
    console.log(`\nสวัสดีครับคุณ ${userName}! มาช่วยดูแลสัตว์ๆ กันเถอะ!\n`);
    mainMenu();
  });
}

// 5. เมนูหลัก (Main Menu)
function mainMenu() {
  console.log("\n================ เมนูหลัก ================");
  console.log("เลือกร่างสัตว์ที่คุณต้องการเข้าไปดูแล:");
  
  zoo.forEach((animal, index) => {
    console.log(`[${index + 1}] ${animal.emoji} ${animal.name} (${animal.species})`);
  });
  console.log("[Q] 🚪 ออกจากเกม");

  rl.question("\nเลือกรายการ (พิมพ์หมายเลข หรือ Q): ", (choice) => {
    const input = choice.trim().toLowerCase();

    if (input === 'q') {
      console.log(`\nขอบคุณที่มาช่วยดูแลสวนสัตว์นะครับคุณ ${userName}! บายๆ 👋`);
      rl.close();
      return;
    }

    const animalIndex = parseInt(input) - 1;

    if (animalIndex >= 0 && animalIndex < zoo.length) {
      const selectedAnimal = zoo[animalIndex];
      selectedAnimal.makeSound();
      animalMenu(selectedAnimal);
    } else {
      console.log("\n❌ ไม่พบรายการสัตว์ที่เลือก กรุณาเลือกใหม่อีกครั้ง");
      mainMenu();
    }
  });
}

// 6. เมนูย่อยดูแลสัตว์ (Sub-Menu)
function animalMenu(animal) {
  // ตรวจสอบว่าชนะเกมหรือยังก่อนเลือกกิจกรรม
  if (animal.isPerfect()) {
    triggerVictory();
    return;
  }

  animal.showStatus();
  console.log(`คุณต้องการทำอะไรกับ ${animal.name}?`);
  console.log("[1] 🍎 ป้อนอาหาร (Feed)");
  console.log("[2] 🧼 อาบน้ำ (Bathe)");
  console.log("[3] ⚽ เล่นด้วยกัน (Play)");
  console.log("[4] ↩️  ย้อนกลับไปเมนูหลัก");

  rl.question("\nเลือกกิจกรรม (1-4): ", (action) => {
    let result = 'OK';

    switch (action.trim()) {
      case "1":
        result = animal.feed();
        break;
      case "2":
        result = animal.bathe();
        break;
      case "3":
        result = animal.play();
        break;
      case "4":
        console.log(`\nย้อนกลับสู่เมนูหลัก...`);
        mainMenu();
        return;
      default:
        console.log("\n❌ ตัวเลือกไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        animalMenu(animal);
        return;
    }

    // หากทำผิดเงื่อนไขจนส่งผลกระทบต่อสัตว์
    if (result !== 'OK') {
      triggerArrest();
      return;
    }

    // หากทำครบทุกอย่างจนเต็ม 100 ชนะทันที
    if (animal.isPerfect()) {
      triggerVictory();
      return;
    }

    // เล่นต่อรอบถัดไป
    animalMenu(animal);
  });
}

// 7. หน้าต่างจบเกมกรณีถูกจับ (Game Over - Arrested)
function triggerArrest() {
  console.log("\n===========================================");
  console.log("👮‍♂️ 🚔 ⛓️  จบเกมคุณถูกจับแล้ว!");
  console.log("===========================================");
  waitToQuit();
}

// 8. หน้าต่างจบเกมกรณีชนะ (Victory - THE END)
function triggerVictory() {
  console.log("\n=================================================================");
  console.log("🏆 😊 🎆 👏");
  console.log("ยินดีด้วยคุณได้รับความรักจากสัตว์ และ ได้รับตำแหน่งเจ้าของสวนสัตว์ที่ยอดเยี่ยมที่สุด!");
  console.log("=================================================================");
  console.log("\n=================================================================");
  console.log("                             THE END                               ");
  console.log("=================================================================");
  waitToQuit();
}

// 9. ฟังก์ชันรอรับปุ่ม Q เพื่อออกจากเกม
function waitToQuit() {
  rl.question("\nกด Q เพื่อออกจากเกม: ", (answer) => {
    if (answer.trim().toLowerCase() === 'q') {
      console.log("\nออกจากเกมเรียบร้อย... สวัสดีครับ 👋");
      rl.close();
    } else {
      waitToQuit();
    }
  });
}

// เริ่มรันเกม
start();