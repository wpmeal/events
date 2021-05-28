function saveToken(token) {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem('auth', token);
  
      resolve('Done');
    });
  }

  function getToken() {
    return sessionStorage.getItem('auth');
  }
  
async function login() {
  //const token = getToken();
  let obj = {
    username: "Chris",
    password: "pwd456"
  }
  const response = await fetch('http://localhost:8000/api/auth/', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  console.log(data);

  if(data.name != "Error"){
    await saveToken(data);
  }else {
    console.log(data.message);
  }
  
}

// login();