class AuthUser{

  constructor() {
   this.initConnection = new ConnectionClass();
  }

 saveToken = (token)=> {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem('auth', token);
  
      resolve('Done');
    });
  }

   getToken = () => {

    let token  = null;

     if(sessionStorage.getItem('auth')){

     token = sessionStorage.getItem('auth');    

     }

    return token;

  }

  deleteToken = () => {

  // let result = true
    // if(sessionStorage.getItem('auth')){
      
      sessionStorage.removeItem('auth');

    // }

  //  return result;

  }
  
login = async (username, password) => {
  //const token = getToken();  
  let credentials = {
    "username": username,
    "password": password
  };
  this.initConnection.fetchInfo.method = 'POST';
  this.initConnection.fetchInfo.endpoint = 'auth';
  this.initConnection.fetchInfo.requestBody =  credentials;
  this.initConnection.fetchInfo.headers = {
   'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  console.log(credentials);

  const data = await this.initConnection.connectTopApi();
 
  console.log(data);

  return data;


  
}
}
//const initAuthuser = new authUser();
//initAuthuser.login("Chris", "pwd456");