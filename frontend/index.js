
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

// getAllEvents();
 initEvent.getEvents();

 bookEventHandler = async (eventId) => {


    console.log(eventId);
  
  
    const result = await initEvent.bestallBiljett(eventId);

    console.log(result);
  
   
    if(result.id){
        alert("Din Biljett är: "+ result.id);
        location.reload();
    }else {
        alert(result.message);  
    }
  
  
  }

