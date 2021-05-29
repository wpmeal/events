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

   getToken = ()=> {
    return sessionStorage.getItem('auth');
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

  const data = await this.initConnection.connectTopApi();
 
  console.log(data);

  if(data.name != "Error"){
    await this.saveToken(data);
  }else {
    console.log(data.message);
  }
  
}
}
//const initAuthuser = new authUser();
//initAuthuser.login("Chris", "pwd456");