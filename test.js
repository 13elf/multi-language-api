const { default: axios } = require('axios')
async function run() {

  const response = await axios.post('http://localhost:8080/user/create', {
    email: 'abc@gmail.com',
    password: '12345'
  })

  console.log(response.status);
  console.log(response.data);

  console.log("======");

  const response2 = await axios.get('http://localhost:8080/user')
  console.log(response2.data);
}

run();