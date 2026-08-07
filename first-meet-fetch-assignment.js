//code ที่ทาง web api-ninjas แนะนำ
/*const request = require('request');พบปัญหาในการใช้งาน request 
var name = 'cheetah
request.get({
  url: 'https://api.api-ninjas.com/v1/animals?name=' + name,
  headers: {
    'X-Api-Key': '1UYe1gN8Mudr6olNxJjEsCI5GAVcxrs79DG97jUK'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});พบปัญหาในการใช้งาน Code ด้านบนที่ทาง เว็บไซต์ api-ninjas.com แนะนำ เมื่อตรวจสอบจจาก search engine พบว่าการใช้งาน ลักษณะนี้เป็นรูปแบบเก่า 
จึงเปลี่ยนไปใช้ในรูปแบบตัวอย่างของ first-meet-fetch-then*/

const name = 'cheetah'; //ประกาศตัวแปร name เพื่อเก็บข้อมูลเสือ 'cheetah'
const apiKey = '1UYe1gN8Mudr6olNxJjEsCI5GAVcxrs79DG97jUK';//คัดลอก Key ที่ได้จาก https://api-ninjas.com/api/animals มาใส่ในตัวแปร apiKey เพื่อใช้ตรวจสอบสิทธิ์ ว่าตรงกันกับ API Server หรือไม่

fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
  method: 'GET',//method: 'GET' ใช้ติดต่อเซิร์ฟเวอร์เพื่อ "ขออ่านข้อมูล/ดึงข้อมูล
  headers: {
    'X-Api-Key': apiKey//แนบ ข้อมูลส่วนหัว (HTTP Headers) API Key ให้เซิร์ฟเวอร์ตรวจสอบสิทธิ์ ว่าตรงกันกับ API Server หรือไม่
  }
})
  .then(response => {//รอรับค่าที่ส่งกลับมา
    if (!response.ok) {//เช็กว่าสถานะการตอบกลับปกติหรือไม่
      throw new Error(`HTTP status ${response.status}`);//หากสถานะ ไม่ปกติ ให้ "Throw" และ แนบ HTTP Status ไปกับข้อความ
    }
    return response.json(); // แปลงผลลัพธ์ที่ได้จาก API เป็น JSON Object
  })
  .then(data => {//รับข้อมูลที่แปลงเป็น JSON Object เข้ามาเก็บไว้ในตัวแปรชื่อ data
    /*console.log(data); //แสดงข้อความในตัวแปร data พบปัญหาในครั้งแรกที่เรียกดูข้อมูลข้อมูลออกมาเยอะเกินไป และ พบการใช้เก็บข้อมูลแบบ Array [],
    ทำให้มีการแสดง ]ในบรรทัดสุดท้ายซึ่งอาจทำให้สับสนจึงเปลี่ยนรูปแบบการแสดงผลตามข้อมูลด้านล่าง*/
  const cheetah = data[0];
  console.log('ชื่อ:', cheetah.name);
  console.log('อายุขัย:', cheetah.characteristics.lifespan);
  console.log('น้ำหนัก:', cheetah.characteristics.weight);
  })
  .catch(error => {//ดักจับ Error" ข้อผิดพลาดที่เกิดขึ้นในขั้นตอนก่อนหน้า
    console.error('Request failed:', error.message);//แสดงข้อความแจ้งเตือนข้อผิดพลาด สาเหตุของ error (error.message) เช่น HTTP status 404 หรือ Failed to fetch
  });

  /* ตัวอย่างข้อความที่ได้พบการใช้ [] Array ในการเก็บข้อมูล ที่ดึงมาจาก API ในครั้งแรก
  [
  {
    name: 'Cheetah',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Mammalia',
      order: 'Carnivora',
      family: 'Felidae',
      genus: 'Acinonyx',
      scientific_name: 'Acinonyx jubatus'
    },
    locations: [ 'Africa', 'Asia', 'Eurasia' ],
    characteristics: {
      prey: 'Gazelle, Wildebeest, Hare',
      name_of_young: 'Cub',
      group_behavior: 'Solitary/Pairs',
      estimated_population_size: '8,500',
      biggest_threat: 'Habitat loss',
      most_distinctive_feature: 'Yellowish fur covered in small black spots',
      gestation_period: '90 days',
      habitat: 'Open grassland',
      diet: 'Carnivore',
      average_litter_size: '3',
      lifestyle: 'Diurnal',
      common_name: 'Cheetah',
      number_of_species: '5',
      location: 'Asia and Africa',
      slogan: 'The fastest land mammal in the world!',
      group: 'Mammal',
      color: 'BrownYellowBlackTan',
      skin_type: 'Fur',
      top_speed: '70 mph',
      lifespan: '10 - 12 years',
      weight: '40kg - 65kg (88lbs - 140lbs)',
      height: '115cm - 136cm (45in - 53in)',
      age_of_sexual_maturity: '20 - 24 months',
      age_of_weaning: '3 months'
    }ปิดข้อมูล characteristics
  }ปิดข้อมูลสัตว์ตัวที่มีการเรียกข้อมูลในครั้งแรก (เผื่อ API ส่งสัตว์ตัวถัดไปมาต่อ)
] ปิดรายการทั้งหมด เพราะ API ส่งข้อมูลกลับมาเป็นแบบ Array (รายการ) เสมอ */

/*ผลลัพธ์ที่ได้หลังการใช้คำสั่ง node first-meet-fetch-assignment.js เพื่อแสดงรูปแบบการแสดงผลหลังจากใช้โค้ดต่อไปนี้ในการแสดงผล
const cheetah = data[0]; ดึงข้อมูลสมาชิกตัวแรก (ตำแหน่งที่ 0) ออกมาจาก Array data นำมาเก็บไว้ในตัวแปร cheetah เพื่อสะดวกในการใช้งานโดยไม่ต้องพิมพ์ data[0] ทุกครั้ง
  console.log('ชื่อ:', cheetah.name);แสดงข้อความคำว่า 'ชื่อ:' และ ดึงค่าจาก cheetah.name) ที่อยู่ใน Object cheetah ออกมาแสดงผล (ผลลัพธ์: ชื่อ: Cheetah)
  console.log('อายุขัย:', cheetah.characteristics.lifespan);แสดงข้อความคำว่า 'อายุขัย:' จาก Object characteristics เพื่อดึงค่า lifespan มาแสดงผล (ผลลัพธ์: อายุขัย: 10 - 12 years)
  console.log('น้ำหนัก:', cheetah.characteristics.weight);แสดงข้อความคำว่า 'น้ำหนัก:' จาก Object characteristics  เพื่อดึงค่า weight มาแสดงผล (ผลลัพธ์: น้ำหนัก: 40kg - 65kg (88lbs - 140lbs)*/

/*ผลลัพธ์ที่แสดงในเทอมินัล
ชื่อ: Cheetah
อายุขัย: 10 - 12 years
น้ำหนัก: 40kg - 65kg (88lbs - 140lbs)*/