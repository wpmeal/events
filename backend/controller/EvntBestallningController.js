const { nanoid } = require('nanoid');

const { isBiljetAvailable,  generateBiljett, getAllEvents, verifyEventBiljett, numOfBiljetterKvar
     } = require('../model/operations');


function EventBestallning(request, response) {
   let result = null;
    try {

    const eventId = request.params.id;

    console.log("Event ID" +  eventId);

    const isBjltAvailable = isBiljetAvailable(eventId);

    console.log("Is ticket available: "+ isBjltAvailable);

        let biljetId = false;
        // keep try until it genaretes a unique ticket number
         while(!biljetId){
         biljetId = generateBiljett(eventId);
         }
          result = biljetId;

    }catch(e){
        result = {
            "name": e.name,
            "message": e.message
        };
    }

    response.json(result);
}

function getAllEventsCont(request, response) {
    let result = null;
   
    try {      
        result = getAllEvents();
        result.forEach(el => {
      //  console.log(el.id);     
            
        const num = numOfBiljetterKvar(el.id);
        el.biljetterKvar = num;

        });
    }catch(e){
        result = {
            "name": e.name,
            "message": e.message
        };
    }

    response.json(result);


   
}
function verifyBiljet(request, response) {
    const biljetId = request.body.biljetId;
    console.log("biljetId: "+ biljetId);

    let result = null;

    try{
    result = verifyEventBiljett(biljetId);    

    }catch(e){
        result = {
            "name": e.name,
            "message": e.message
        };
    }

    response.json(result);


   
}


module.exports.EventBestallning = EventBestallning;
module.exports.getAllEventsCont = getAllEventsCont;
module.exports.verifyBiljet = verifyBiljet;


