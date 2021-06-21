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
       <aside class="event-date"><div>${el.date}</div></aside>
       <div class="event-content"> 
       <h1><a href="buy.html?id=${el.id}">${el.title}</a></h1>
     
      
        <p class="publisher">
        ${el.publisher}
        </p>
        <p>
        ${el.biljetterKvar} biljeter Kvar 
        </p>
            <p>${el.time} <span class="price">${el.price} ${el.currency}</span></p>
      
        </div>
  `;


      // assign inner html content to our parent article obj
      articleHtmlObj.innerHTML = innerHtml;

      // append each article html item to dom
      container.appendChild(articleHtmlObj);
    })

  }


  renderSingleItem = (el = '') => {

    // html container to load events entities inside it 
    let container = document.querySelector("#eventsListContainer");

    // check if we have an error response
    if (el.error && el.message) {
      container.innerHTML = `<b>${data.message}</b>`;
    }

    // otherwise loop through our data array 
    // else data.forEach(el => {


    // create an article html obj that will represent each event to the client/browser
    const articleHtmlObj = document.createElement("div");
    articleHtmlObj.className = "event-details";

    // html article content
    let innerHtml = `
       <p>You are about to score some tickets to</p>
       <div class="event-content"> 
       <h1>${el.title}</h1>
     
        <p>
            <span>${el.date} ${el.time}</span>
        </p>
        <p class="publisher">
        @${el.publisher}
        </p>
        <p>
        ${el.price} ${el.currency}
        </p>
    
            <p>${el.biljetterKvar} biljeter Kvar </p>
           <p>
            <a href="ticket.html?eventId=${el.id}"><button class="book">
                Beställ
            </button></a>
            </p>
            </div>
      
      
  `;


    // assign inner html content to our parent article obj
    articleHtmlObj.innerHTML = innerHtml;

    // append each article html item to dom
    container.appendChild(articleHtmlObj);


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

  /**
   * Get single event details
   */
  getSingleEvent = async (eventId) => {

    // configure the connection
    this.authUser.initConnection.fetchInfo.method = 'GET';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';
    this.authUser.initConnection.fetchInfo.paramName = 'buy';
    this.authUser.initConnection.fetchInfo.paramValue = eventId;


    // execute the connection
    const data = await this.authUser.initConnection.connectTopApi();

    console.log(data);

    // return event obj
    return data;



  }


  renderTicket = (el = '', ticketCode = '') => {

    // html container to load events entities inside it 
    let container = document.querySelector("#eventsListContainer");

    // check if we have an error response
    if (el.error && el.message) {
      container.innerHTML = `<b>${data.message}</b>`;
    }

    // create an article html obj that will represent each event to the client/browser
    const articleHtmlObj = document.createElement("div");
    articleHtmlObj.className = "ticket";

    // html article content
    let innerHtml = `
       <div class="ticket-content"> 
       <h1>${el.title}</h1>
     
   
        <p class="publisher"><span>Where</span>
       </br>
        ${el.publisher}
        </br>
        </br>
        </p>
        <p class="date">
        <span>When: ${el.date} </span><span>Time: ${el.time}</span>
    </p>
      
      <p class="barcode">
      <image src="barcode.png" alt="Ticket Barcode">
      </br>
      ${ticketCode}
      </p>
        </div>
  `;


    // assign inner html content to our parent article obj
    articleHtmlObj.innerHTML = innerHtml;

    // append each article html item to dom
    container.appendChild(articleHtmlObj);


  }


}

