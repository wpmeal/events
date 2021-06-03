/*
* A Class to process events
*/
class Event {

  constructor() {
    // initialize Events dependency: AuthUser class on each new instance of Event Class
    this.authUser = new AuthUser();

  }
  /*
  * VerifyBiljett method
  * params: biljet Id: String
  * return json response from server 
  */
  verifyBiljett = (biljetId) => {
    // get login token from local storage
    const token = this.authUser.getToken();
    // log it
    console.log(token);
    // reassign it as an obj
    const biljetIdObj = {
      biljetId: biljetId
    }
    // configure the connection settings
    this.authUser.initConnection.fetchInfo.method = 'POST';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';
    this.authUser.initConnection.fetchInfo.paramName = 'verify';
    this.authUser.initConnection.fetchInfo.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    this.authUser.initConnection.fetchInfo.requestBody = biljetIdObj;

    // execute the conncetion to backend
    const data = this.authUser.initConnection.connectTopApi();

    // return server response 
    return data;

  }

  /*
  * bestallBiljett method
  * params: event Id: String
  * return json response from server 
  */

  bestallBiljett = async (eventId) => {

    // configure the connection settings
    this.authUser.initConnection.fetchInfo.method = 'GET';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';
    this.authUser.initConnection.fetchInfo.paramName = 'book';
    this.authUser.initConnection.fetchInfo.paramValue = eventId;

    // execute the conncetion to backend
    const data = await this.authUser.initConnection.connectTopApi();

    // return server response 
    return data;


  }

  /*
  * renderItem method
  * receive data array from server then render them as html entities
  */

  renderItem = (data = '') => {

    // html container to load events entities inside it 
    let container = document.querySelector("#eventsListContainer");

    // check if we have an error response
    if (data.error && data.message) {
      container.innerHTML = `<b>${data.message}</b>`;
    }

    // otherwise loop through our data array 
    else data.forEach(el => {

      // create an article html obj that will represent each event to the client/browser
      const articleHtmlObj = document.createElement("article");

      // html article content
      let innerHtml = `
        <h1>${el.title}</h1>
     
        <p>
            When? <span>${el.date}</span>
        </p>
        <p>
            Where? <span>${el.desc}</span>
        </p>
        <p class="publisher">
        ${el.publisher}
        </p>
        <section>
            <p>${el.biljetterKvar} biljeter Kvar</p>
            <button class="book" onclick="bookEventHandler(${el.id})">
                Boka for ${el.price} ${el.currency}
            </button>
            <input type="hidden" name="eventId" value="${el.id}" />
        </section>
  `;


      // assign inner html content to our parent article obj
      articleHtmlObj.innerHTML = innerHtml;

      // append each article html item to dom
      container.appendChild(articleHtmlObj);
    })

  }
  /*
  * getEvents method
  * receive data array from server then execute the rendering mehtod on it
  */
  getEvents = async () => {

    // configure the connection
    this.authUser.initConnection.fetchInfo.method = 'GET';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';

    // execute the connection
    const data = await this.authUser.initConnection.connectTopApi();

    // call rendering mehtod on the reposnse
    this.renderItem(data);

  }

}

