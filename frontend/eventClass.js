class Event {

  constructor() {
    //this.initConnection = new connectionClass();
    this.authUser = new AuthUser();

  }
  verifyBiljett =  (biljetId) => {
    const token =  this.authUser.getToken();
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
    
    const data = this.authUser.initConnection.connectTopApi();

   // console.log(data);

     return data;

 
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


    return data;
 
  
  }




  // verifyBiljett();     
  // bestallBiljett();
  // getEvents();


  renderItem =  (Data = '', refresh = true) => {

    let container  = document.querySelector("#eventsListContainer");

    // clean the dom
   // document.querySelector("main").innerHTML = "";

    // check if we have an error response
    if (Data.name && Data.message) {
      container.innerHTML = `<b>${Data.message}</b>`;
    }

    // otherwise loop through our data array 
    else Data.forEach(el => {

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
            <button class="book" onclick="bookEventHandler(${el.id})">
                Boka for ${el.price} &nbsp;  ${el.currency}
            </button>
            <input type="hidden" name="eventId" value="${el.id}" />
        </section>
  `;


        // assign html content to our parent article obj
        articleHtmlObj.innerHTML = innerHtml;

        // append each article html item to dom
        container.appendChild(articleHtmlObj);
    })

}
  
getEvents = async () => {

  this.authUser.initConnection.fetchInfo.method = 'GET';
  this.authUser.initConnection.fetchInfo.endpoint = 'event';

  const data = await this.authUser.initConnection.connectTopApi();
  console.log(data);
  ///if(result.message){

 // }
 //  else {
     this.renderItem(data);

  // }

  
  
}

}

const initEvent = new Event();
//initEvent.authUser.login("Chris","pwd456");
//initEvent.verifyBiljett("BVEAtKmtr5uliMPhIHEoV");
// initEvent.bestallBiljett(1);
 // initEvent.getEvents();