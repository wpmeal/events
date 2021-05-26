const { nanoid } = require('nanoid');

const { isBiljetAvailable,  generateBjljet, getAllevents, verifyEventBiljett
     } = require('../model/operations');


function EvntBestallning(request, response) {

    const eventId = request.params.id;

    console.log("Event ID" +  eventId);

    const isAvailable = isBiljetAvailable(eventId);

    console.log("Is tickt available"+ isAvailable);

    if(isAvailable){
       // const biljetId = nanoid();
        const biljetId = generateBjljet(eventId);

        if(biljetId){

            response.json({biljetId: biljetId})

        }else {

            response.json({biljetId: ""})

        }
    }
}

function getAllEventsCont(request, response) {

    const allEvents = getAllevents();


    response.json(allEvents);


   
}
function verifyBiljet(request, response) {
    const biljetId = request.params.id;


    const result = verifyEventBiljett(biljetId);


    response.json(result);


   
}


module.exports.EvntBestallning = EvntBestallning;
module.exports.getAllEventsCont = getAllEventsCont;
module.exports.verifyBiljet = verifyBiljet;


