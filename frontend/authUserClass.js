/*
* A Class to authenticate and  authorise the user
*/
class AuthUser {

  // initilize ConnectionClass 
  constructor() {

    this.initConnection = new ConnectionClass();

  }

  // save login token as session item  
  saveToken = (token) => {

    return new Promise((resolve, reject) => {

      sessionStorage.setItem('auth', token);

      resolve('Done');

    });

  }

  // get token from session storage
  getToken = () => {

    let token = null;

    if (sessionStorage.getItem('auth')) {

      token = sessionStorage.getItem('auth');

    }

    return token;

  }

  // delete token from session storage
  deleteToken = () => {

    sessionStorage.removeItem('auth');

  }

  /*
  * Login method
  * params: username, password
  * return token/error as json
  */
  login = async (username, password) => {

    // reassign credentials
    let credentials = {
      "username": username,
      "password": password
    };

    // set connections settings 
    this.initConnection.fetchInfo.method = 'POST';
    this.initConnection.fetchInfo.endpoint = 'auth';
    this.initConnection.fetchInfo.requestBody = credentials;
    this.initConnection.fetchInfo.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    // execute connection to backend  
    const data = await this.initConnection.connectTopApi();

    // log response data
    console.log(data);

    // return response data 
    return data;

  }
}
