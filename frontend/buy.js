// initialize Event class only once
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

getEventDetails = async () => {

    var eventId = location.search.split('id=')[1];
    // get and render  event details from server
    var eventObj = await initEvent.getSingleEvent(eventId);

    initEvent.renderSingleItem(eventObj);

}

getEventDetails();