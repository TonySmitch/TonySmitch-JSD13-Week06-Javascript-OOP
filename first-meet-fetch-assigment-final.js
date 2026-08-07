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