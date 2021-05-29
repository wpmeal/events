class Event {

  constructor() {
    //this.initConnection = new connectionClass();
    this.authUser = new AuthUser();

  }
  verifyBiljett = async (biljetId) => {
    const token = this.authUser.getToken();
    console.log(token);
    const biljetIdObj = {
      biljetId: biljetId
    }
    this.authUser.initConnection.fetchInfo.method = 'POST';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';
    this.authUser.initConnection.fetchInfo.paramName = 'verify';
    this.authUser.initConnection.fetchInfo.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    this.authUser.initConnection.fetchInfo.requestBody = biljetIdObj;
    const data = await this.authUser.initConnection.connectTopApi();

   /* const response = await fetch('http://localhost:8000/api/event/verify/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    */

    console.log(data);

    // await saveToken(data.token);
  }



  bestallBiljett = async (eventId) => {
    //const token = this.authUser.getToken();
    //const eventId = 1;
    //console.log(token);
    this.authUser.initConnection.fetchInfo.method = 'GET';
    this.authUser.initConnection.fetchInfo.endpoint = 'event';
    this.authUser.initConnection.fetchInfo.paramName = 'book';
    this.authUser.initConnection.fetchInfo.paramValue = eventId;
   /* this.authUser.initConnection.fetchInfo.headers = {
      'Content-Type': 'application/json'
    }; */
    // this.authUser.initConnection.fetchInfo.requestBody = biljetIdObj;
    const data = await this.authUser.initConnection.connectTopApi();
    console.log(data);

 
    /*
    const response = await fetch(`http://localhost:8000/api/event/book/${eventId}`, {
      headers: {
        //      'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      //  body: JSON.stringify(obj),
    });
    const data = await response.json();

    console.log(data);

    // await saveToken(data.token);
    */
  }




  // verifyBiljett();     
  // bestallBiljett();
  // getEvents();


  renderItem = async (Data = '', refresh = true) => {

    // clean the dom
   // document.querySelector("main").innerHTML = "";

    // check if we have en empty data items 
    if (Data.length == 0) {
        document.querySelector("main").innerHTML = '<b>No Event Found!</b>';
    }

    // otherwise loop through our data array 
    else await Data.forEach(el => {

        // create an article html obj that will represent each items/product to the client/browser
        const articleHtmlObj = document.createElement("article");

    
      let  innerHtml = `
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
            <button id="book">
                Boka for ${el.price} &nbsp;  ${el.currency}
            </button>
        </section>
  `;


        // assign html content to our parent article obj
        articleHtmlObj.innerHTML = innerHtml;

        // append each article html item to dom
        document.querySelector("main").appendChild(articleHtmlObj);
    })

}
  
getEvents = async () => {

  this.authUser.initConnection.fetchInfo.method = 'GET';
  this.authUser.initConnection.fetchInfo.endpoint = 'event';

  const data = await this.authUser.initConnection.connectTopApi();
  console.log(data);
  this.renderItem(data);
  
}
}

const initEvent = new Event();
//initEvent.authUser.login("Chris","pwd456");
//initEvent.verifyBiljett("BVEAtKmtr5uliMPhIHEoV");
// initEvent.bestallBiljett(1);
 initEvent.getEvents();