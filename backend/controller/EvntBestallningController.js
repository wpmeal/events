const { isBiljetAvailable,  generateBiljett, getAllEvents, verifyEventBiljett, numOfBiljetterKvar, getEvent
     } = require('../model/operations');

/* 
* Event Booking  Controller
* Params: request, response
* Return biljetId/error as json 
*/
function EventBestallning(request, response) {

   let result = null;

    try {

    // reassign event Id from request
    const eventId = request.params.id;
    // log it to server
    console.log("Event ID "+ eventId);
    // Check if bilijett available  
    const isBjltAvailable = isBiljetAvailable(eventId);
    // log its availability
    console.log("Is Biljett available: "+ isBjltAvailable);
     
        let biljetId = false;
        // keep try until it genaretes a unique Biljett number
         while(!biljetId){
         // genearate a biljett code
         biljetId = generateBiljett(eventId);

         }
          result = biljetId;

    // Catch any throwable error from isBiljetAvailable or generateBiljett 
    }catch(e){

        result = {
            "error": e.name,
            "message": e.message
        };
    }

    response.json(result);
}

/* 
* Get all events Controller
* Params: request, response
* Return events/error as json 
*/
function getAllEventsCont(request, response) {
    let result = null;
   
    try { 
        // Get all events     
        result = getAllEvents();
        // loop to check biljett availability for each event
        result.forEach(el => {
         // calculate num of biljetter available     
        const num = numOfBiljetterKvar(el.id);
        // a new obj property for the number of available biljetter to be returned into the response
        el.biljetterKvar = num;

        });

    }catch(e){

        result = {
            "error": e.name,
            "message": e.message
        };
    }

    response.json(result);
   
}

/**
 * Get Single Event Controller
 * @param {*} request 
 * @param {*} response 
 */
function getEventCont(request, response) {
    let result = null;
   
    try { 
        
        // get event id from request
        eventId = request.params.id;

       // console.log(eventId);

        // Get event    
        result = getEvent(eventId);

      // console.log(result);

         // calculate num of biljetter available     
        const num = numOfBiljetterKvar(result.id);

        // a new obj property for the number of available biljetter to be returned within the response
        result.biljetterKvar = num;

       // });

    }catch(e){

        result = {
            "error": e.name,
            "message": e.message
        };
    }

    response.json(result);
   
}


/* 
* Verify Biljett Controller
* Params: request, response
* Return Biljett/error as json 
*/
function verifyBiljet(request, response) {
   
    const biljetId = request.body.biljetId;

    console.log("biljetId: "+ biljetId);

    let result = null;

    try{
     // verify biljett   
    result = verifyEventBiljett(biljetId);    

    } catch(e) {

        result = {
            "error": e.name,
            "message": e.message
        };
    }

    response.json(result);   
}

module.exports.EventBestallning = EventBestallning;
module.exports.getAllEventsCont = getAllEventsCont;
module.exports.getEventCont = getEventCont;
module.exports.verifyBiljet = verifyBiljet;


